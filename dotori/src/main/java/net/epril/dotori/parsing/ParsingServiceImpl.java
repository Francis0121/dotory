package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.inject.Inject;

import net.epril.dotori.regex.Regex;
import net.epril.dotori.regex.RegexService;
import net.epril.dotori.regex.RegexUtil;
import net.epril.dotori.util.Pagination;

import org.apache.commons.lang3.StringEscapeUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;

/**
 * @author Francis
 * @version v0.1
 * @since 14.08.08
 */
@Service
public class ParsingServiceImpl extends SqlSessionDaoSupport implements
		ParsingService {

	@Inject
	private RegexService regexService;
	
	// TODO Image Parsing, Title Parsing 처리 분리해서 하고 합쳐서하는 함수 따로 구현.

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> controlParsingData(Parsing parsing)
			throws IOException {
		Map<String, Object> map = new HashMap<String, Object>();

		Document fullBody = Jsoup.connect(parsing.getUrl())
				.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36")
				.get();
		parsing.setText(fullBody.toString());
		parsing.setTitle(fullBody.getElementsByTag("title").text());

		getSqlSession().insert("parsing.insertParsing", parsing);
		insertParsingDate(parsing);
		
		map.putAll(imageFilter(parsing, fullBody));		
		insertParsingImageUrl((List<Image>) map.get("images"));

		map.putAll(titleFilter(parsing, fullBody));
		
		return map;
	}

	private Map<String, Object> imageFilter(Parsing parsing, Document document){
		// ~ Elimination Tag 
		// ~ TODO 정규표현식 문제점 <div> <div></div> </div>가 되는 경우 </div>를 먼저있는것이 걸려서 삭제가 안됨
		// ~ iframe을 무조건 적으로 삭제했더니 문제가 생김
		String html = document.toString();
		List<String> strRegexs = regexService.makeImageRegexList(new Regex(0, RegexUtil.REGEX_GROUP_TAG, RegexUtil.REGEX_CATEGORY_IMAGE));
		for(String regex: strRegexs){
			 html = html.replaceAll(regex, "");
		}
		// 쓸모 없는 테그 제거
		document = Jsoup.parse(html);
		
		// ~ Id, class Delete List
		Pattern pattern = Pattern.compile("[\\w:\\-]?id[\\s]*?=[\\s]*?(\"[^\"]+\"|'[^']+'|\\w+)");
		Matcher matcher = pattern.matcher(document.toString());
		List<String> deleteRegexs = regexService.makeImageRegexList(new Regex(0, RegexUtil.REGEX_GROUP_DELETE, RegexUtil.REGEX_CATEGORY_IMAGE));
		List<String> eliminateList = new ArrayList<String>();

		while(matcher.find()){
			String strMatch = matcher.group().replaceAll("id=\"", "").replaceAll("\"", "");		
			// ~ Database의 내용과 맞다면
			for(String regex : deleteRegexs){
				if(strMatch.matches(regex)){
					eliminateList.add(strMatch);
				}
			}
		}
		logger.debug("Eleminat ID : " + eliminateList.toString());
		
		// ~ TODO 일단 제거
		for(String strEle : eliminateList){
			Element element = document.getElementById(strEle);
			if(element != null){
				logger.debug("\n"+element.toString()+"\n");
				element.remove();				
			}else{
				logger.warn("Why this element not search?? [ Name = " + strEle + " ] ");
			}
		}
		
		// ~ Class Extract
		pattern = Pattern.compile("[\\w:\\-]?class[\\s]*?=[\\s]*?(\"[^\"]+\"|'[^']+'|\\w+)");
		matcher = pattern.matcher(document.toString());	
		eliminateList = new ArrayList<String>();
		
		while(matcher.find()){
			String strMatch = matcher.group().replaceAll("class=\"", "").replaceAll("\"", "");	
			// ~ Database의 내용과 맞다면
			for(String regex : deleteRegexs){
				if(strMatch.matches(regex)){
					eliminateList.add(strMatch);
				}
			}
		}
		logger.debug("Eleminate CLASS : " + eliminateList.toString());
	
		// ~ TODO : 일단 그냥 삭제
		for(String strEle: eliminateList){			
			Elements elements = document.getElementsByClass(strEle);
			logger.debug("\n"+elements.toString()+"\n");
			elements.remove();
		}

		// ~ Selected Tag and Export Image url
		List<Image> images = new ArrayList<Image>();
		
		List<String> selectRegexs = regexService.makeImageRegexList(new Regex(0, RegexUtil.REGEX_GROUP_SELECT, RegexUtil.REGEX_CATEGORY_IMAGE));
		List<String> selectList = new ArrayList<String>();

		// ~ ID
		pattern = Pattern.compile("[\\w:\\-]?id[\\s]*?=[\\s]*?(\"[^\"]+\"|'[^']+'|\\w+)");
		matcher = pattern.matcher(document.toString());
		while(matcher.find()){
			String strMatch = matcher.group().replaceAll("id=\"", "").replaceAll("\"", "");
			for(String regex: selectRegexs){
				if(strMatch.matches(regex)){
					selectList.add(strMatch);
				}
			}
		}
		logger.debug("Select ID : " +  selectList);
		for(String strSel : selectList){
			Element sel = document.getElementById(strSel);
			if(sel != null){
				Elements elements = sel.select("img");
				for (Object obj : elements.toArray()) {
					Element element = (Element) obj;
					// TODO width, height, color
					Image image = new Image(parsing.getPn(), element.attr("src"), 100, 100, 1);
					if(!images.contains(image)){
						images.add(image);
					}
				}
			}else{
				logger.warn("Why this element not search?? [ Name = " + strSel + " ] ");
			}
		}
		
		// ~ Classs
		selectList = new ArrayList<String>();
		pattern = Pattern.compile("[\\w:\\-]?class[\\s]*?=[\\s]*?(\"[^\"]+\"|'[^']+'|\\w+)");
		matcher = pattern.matcher(document.toString());
		while(matcher.find()){
			String strMatch = matcher.group().replaceAll("class=\"", "").replaceAll("\"", "");
			for(String regex: selectRegexs){
				if(strMatch.matches(regex)){
					selectList.add(strMatch);
				}
			}
		}
		logger.debug("Select Class : " + selectList);
		
		for(String strSel : selectList){
			Elements classes = document.getElementsByClass(strSel);
			logger.debug("\n"+classes.toString()+"\n");
			for(Element clazz: classes){
				Elements elements = clazz.select("img");
				for (Object obj : elements.toArray()) {
					Element element = (Element) obj;
					// TODO width, height, color
					Image image = new Image(parsing.getPn(), element.attr("src"), 100, 100, 1);
					if(!images.contains(image)){
						images.add(image);
					}
				}
			}	
		}
		
		if(images.size() == 0){
			logger.debug("No Element selected -> Extract Document Class");
			Elements elements = document.select("img");
			for (Object obj : elements.toArray()) {
				Element element = (Element) obj;
				// TODO width, height, color
				images.add(new Image(parsing.getPn(), element.attr("src"), 100, 100, 1));
			}
		}
		
		logger.info("\nImage URL List "+images.size() + "\n "+  images.toString());
		
		// ~ Return Data
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("images", images);
		map.put("htmlImage", StringEscapeUtils.escapeHtml4(document.toString()));
		return map;
	}
	
	private Map<String, Object> titleFilter(Parsing parsing, Document document){
		// ~ Elimination Tag
		String html = document.toString();
		List<String> strRegexs = regexService.makeTitleRegexList(new Regex(0, RegexUtil.REGEX_GROUP_TAG, RegexUtil.REGEX_CATEGORY_TITLE));
		for(String regex: strRegexs){
			 html = html.replaceAll(regex, "");
		}

		// ~ Title Tag Extract
		
		
		// ~ Return Data
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("htmlTitle", StringEscapeUtils.escapeHtml4(html));
		return map;
	}
	
	
	private void insertParsingDate(Parsing parsing) {
		getSqlSession().insert("parsing.insertParsingDate", parsing);
	}

	private void insertParsingImageUrl(List<Image> images) {
		if (images.size() > 0)
			getSqlSession().insert("parsing.insertParsingImageUrl", images);
	}

	// TODO Parsing에 대한 검색 조건 다양화.
	@Override
	public Map<String, Object> selectParsingList(ParsingFilter parsingFilter) {
		Map<String, Object> map = new HashMap<String, Object>();
		Pagination pagination = parsingFilter.getPagination();
		
		int count = selectParsingCount(parsingFilter);
		if(count == 0){
			map.put("parsings", new ArrayList<Parsing>());
			return map; 
		}
		
		pagination.setNumItems(count);
		List<Parsing> parsings = getSqlSession().selectList("parsing.selectParsingList", parsingFilter);
		map.put("parsings", parsings);
		return map;
	}
	
	private int selectParsingCount(ParsingFilter parsingFilter){
		return getSqlSession().selectOne("parsing.selectParsingCount", parsingFilter);
	}
	
	@Override
	public Map<String, Object> selectDetailInformation(Parsing parsing) {
		String html = getSqlSession().selectOne("parsing.selectDetailInformation", parsing.getPn());
		Document document = Jsoup.parse(html);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.putAll(imageFilter(parsing, document));
//		map.remove("images"); // 새로 계산된 이미지는 필요 없음
//		map.put("images", getSqlSession().selectList("parsing.selectDetailInfoImages", parsing.getPn()));
		map.putAll(titleFilter(parsing, document));
		return map;
	}	
}
