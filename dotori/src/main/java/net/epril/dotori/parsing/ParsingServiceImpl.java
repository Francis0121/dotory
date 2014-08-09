package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	//TODO Image Parsing, Title Parsing 처리 분리해서 하고 합쳐서하는 함수 따로 구현.
	
	@Override
	public Map<String, Object> controlParsingData(Parsing parsing) throws IOException {
		Document fullBody =	Jsoup.connect(parsing.getUrl()).userAgent("Mozilla").get();
		parsing.setText(fullBody.toString());
		parsing.setTitle(fullBody.getElementsByTag("title").text());
		
		getSqlSession().insert("parsing.insertParsing", parsing);
		insertParsingDate(parsing);
		
		// img Tag Extrace
		Elements elements = fullBody.select("img");
		List<Image> images = new ArrayList<Image>();
		for (Object obj : elements.toArray()) {
			Element element = (Element) obj;
			// TODO width, height, color
			images.add(new Image(parsing.getPn(), element.attr("src"), 100, 100, 1));
		}
		insertParsingImageUrl(images);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("images", images);
		map.put("text", StringEscapeUtils.escapeHtml4(parsing.getText()));
		return map;
	}
	
	private void insertParsingDate(Parsing parsing){
		getSqlSession().insert("parsing.insertParsingDate", parsing);
	}
	
	private void insertParsingImageUrl(List<Image> images){
		getSqlSession().insert("parsing.insertParsingImageUrl", images);
	}
	
}
