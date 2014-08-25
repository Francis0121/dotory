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

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("imageFilter")
public class ImageFilter implements Filter{
	
	private static Logger logger = LoggerFactory.getLogger(ImageFilter.class);
	
	@Inject
	private RegexService regexService;
	
	@Override
	public Map<String, Object> filtering(Parsing parsing, Document document){
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
				//logger.debug("\n"+element.toString()+"\n");
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
		return map;
	}
	
	@Override
	public Map<String, Object> frameFiltering(Parsing parsing)
			throws IOException {
		List<Document> documents = new ArrayList<Document>();
		List<String> frameSrcs = parsing.getFrameSrcs();
		while(true){
			List<String> newFrameSrcs = new ArrayList<String>();
			Document document;
			for(String frameSrc : frameSrcs){
				logger.debug("Crawler Doing Url " + frameSrc);
				document = Jsoup.connect(frameSrc)
							.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36").get();
				// ~ Change Absolute Path
				Elements elems = document.select("[src]");
		        for(Element elem : elems){
		            if( !elem.attr("src").equals(elem.attr("abs:src")) ){
		                elem.attr("src", elem.attr("abs:src"));
		            }
		        }
				
				Pattern pattern = Pattern.compile("<frame[^>]*src=[\'\"]?([^>\'\"]+)[\'\"]?[^>]*>");
				Matcher matcher = pattern.matcher(document.html());
				// ~ Not Match add Documents
				int count = 0;
				while(matcher.find()){
					count++;
					String frame = matcher.group();
					String[] arrTemp = frame.split(" ");
					
					for(String strTemp : arrTemp){
						Pattern srcPattern = Pattern.compile("src=");
						Matcher srcMatcher = srcPattern.matcher(strTemp);
						if(srcMatcher.find()){
							String newFrameSrc = strTemp.replace("src=", "").replace("\"", "");
							if(!frameSrc.contains(newFrameSrc)){
								logger.debug("Frame src : " + newFrameSrc);
								newFrameSrcs.add(newFrameSrc);
							}
						}
					}
				}
				
				if(count == 0){
					documents.add(document);
					continue;
				}	
			}
			if(newFrameSrcs.size() == 0){
				break;
			}else{
				frameSrcs = newFrameSrcs;
			}
		}
		logger.debug("Document size = " + documents.size());
		List<Image> totalImage = new ArrayList<Image>();
		for(Document document : documents){
			Map<String, Object> imageMap = filtering(parsing, document);
			@SuppressWarnings("unchecked")
			List<Image> images = (List<Image>) imageMap.get("images");
			totalImage.addAll(images);
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("images", totalImage);
		return map;
	}
}
