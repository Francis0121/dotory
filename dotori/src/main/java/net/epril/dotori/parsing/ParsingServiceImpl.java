package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		String html = document.toString();
		List<String> strRegexs = regexService.makeImageRegexList(new Regex(0, RegexUtil.REGEX_GROUP_TAG, RegexUtil.REGEX_CATEGORY_IMAGE));
		for(String regex: strRegexs){
			 html = html.replaceAll(regex, "");
		}

		// img Tag Extrace
		Document eleminateDoc = Jsoup.parse(html);
		Elements elements = eleminateDoc.select("img");
		List<Image> images = new ArrayList<Image>();
		for (Object obj : elements.toArray()) {
			Element element = (Element) obj;
			// TODO width, height, color
			images.add(new Image(parsing.getPn(), element.attr("src"), 100, 100, 1));
		}
		logger.info("Image URL List "+images.size() + "\n "+  images.toString());
		
		
		// ~ Return Data
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("images", images);
		map.put("htmlImage", StringEscapeUtils.escapeHtml4(html));
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
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.putAll(imageFilter(parsing, Jsoup.parse(html)));
		map.remove("images"); // 새로 계산된 이미지는 필요 없음
		map.put("images", getSqlSession().selectList("parsing.selectDetailInfoImages", parsing.getPn()));
		return map;
	}	
}
