package net.epril.dotori.parsing;

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

import org.apache.commons.lang3.StringEscapeUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("titleFilter")
public class TitleFilter implements Filter {

	private static Logger logger = LoggerFactory.getLogger(TitleFilter.class);
	
	@Inject
	private RegexService regexService;

	@Override
	public Map<String, Object> filtering(Parsing parsing, Document document) {
		// ~ Elimination Tag
		StringBuffer show = new StringBuffer(document.getElementsByTag("title").text()+"<br/>");
		StringBuffer text = new StringBuffer(document.getElementsByTag("title").text()+" ");
		String html = document.toString();
		List<String> strRegexs = regexService.makeTitleRegexList(new Regex(0, RegexUtil.REGEX_GROUP_TAG, RegexUtil.REGEX_CATEGORY_TITLE));
		for (String regex : strRegexs) {
			html = html.replaceAll(regex, "");
		}
		document = Jsoup.parse(html);
		// ~ Title Tag Extract
		
		// ~ Delete
		Pattern pattern = Pattern.compile("[\\w:\\-]?id[\\s]*?=[\\s]*?(\"[^\"]+\"|'[^']+'|\\w+)");
		Matcher matcher = pattern.matcher(document.toString());
		List<String> deleteRegexs = regexService.makeImageRegexList(new Regex(0, RegexUtil.REGEX_GROUP_DELETE, RegexUtil.REGEX_CATEGORY_TITLE));
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
		
		
		// ~ Select
		
		List<Regex> tags = regexService.selectRegex(new Regex(0, RegexUtil.REGEX_GROUP_SELECT_TAG, RegexUtil.REGEX_CATEGORY_TITLE));
		logger.debug("Tags List " + tags);
		// ~ Each Tag Text Extract
		for(Regex tag: tags){
			Elements elements = document.getElementsByTag(tag.getShape());
			show.append("Tag["+tag.getShape()+ "] : " +elements.text()+"<br/>");
			text.append(elements.text()+" ");

			logger.debug("Tag " + elements.html() +"\n\n");
		}
		
		
		// ~ Id
		pattern = Pattern.compile("[\\w:\\-]?id[\\s]*?=[\\s]*?(\"[^\"]+\"|'[^']+'|\\w+)");
		matcher = pattern.matcher(document.toString());
		List<String> selectRegexs = regexService.makeImageRegexList(new Regex(0, RegexUtil.REGEX_GROUP_SELECT, RegexUtil.REGEX_CATEGORY_TITLE));
		List<String> ids = new ArrayList<String>();
		
		while(matcher.find()){
			String strMatch = matcher.group().replaceAll("id=\"", "").replaceAll("\"", "");		
			// ~ Match Database Data
			for(String regex : selectRegexs){
				if(strMatch.matches(regex)){
					ids.add(strMatch);
				}
			}
		}
		logger.debug("Select ID : " + ids.toString());
	
		// ~ Each Id Text Textract
		for(String id : ids){
			Element element = document.getElementById(id);
			show.append("Id["+id+"]"+element.text()+"<br/>");
			text.append(element.text()+ " ");
			logger.debug("ID " + element.html() +"\n\n");
		}
		
		// ~ Class
		pattern = Pattern.compile("[\\w:\\-]?class[\\s]*?=[\\s]*?(\"[^\"]+\"|'[^']+'|\\w+)");
		matcher = pattern.matcher(document.toString());
		selectRegexs = regexService.makeImageRegexList(new Regex(0, RegexUtil.REGEX_GROUP_SELECT, RegexUtil.REGEX_CATEGORY_TITLE));
		List<String> classes = new ArrayList<String>();
		
		while(matcher.find()){
			String strMatch = matcher.group().replaceAll("class=\"", "").replaceAll("\"", "");		
			// ~ Match Database Data
			for(String regex : selectRegexs){
				if(strMatch.matches(regex)){
					if(!classes.contains(strMatch)){
						classes.add(strMatch);
					}
				}
			}
		}
		logger.debug("Select Class : " + classes.toString());
	
		// ~ Each Id Text Textract
		for(String clazz : classes){
			Elements elements = document.getElementsByClass(clazz);
			if(elements.size() > 0){
				Element element = elements.get(0);
				show.append("Class["+clazz+"]"+element.text()+"<br/>");
				text.append(element.text()+ " ");
				logger.debug("Class " + element.html() +"\n\n");
			}			
		}
		// ~ Slice text space
		
		// ~ Return Data
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("htmlTitle", StringEscapeUtils.escapeHtml4(html));
		map.put("titleText", show.toString());
		return map;
	}
}
