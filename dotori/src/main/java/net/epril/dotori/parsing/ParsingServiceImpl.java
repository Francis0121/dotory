package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.inject.Inject;

import net.epril.dotori.util.Pagination;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Qualifier;
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
	@Qualifier("imageFilter")
	private Filter imageFilter;
	@Inject
	@Qualifier("titleFilter")
	private Filter titleFilter;
	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> controlParsingData(Parsing parsing)
			throws IOException {
		Map<String, Object> map = new HashMap<String, Object>();
		// ~ URL, Visit, Data 
		Pattern pattern = Pattern.compile("^(http|https):\\/\\/([a-z0-9-_\\.]*)[\\/\\?]{0,1}");
		Matcher matcher = pattern.matcher(parsing.getUrl());
		if(matcher.find()){
			String domain = matcher.group();
			parsing.setDomain(domain);
		}else{
			return new HashMap<String, Object>();
		}
		
		Document fullBody = Jsoup.connect(parsing.getUrl())
				.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36")
				.get();
		// ~ src attribute change absolute url
        Elements elems = fullBody.select("[src]");
        for( Element elem : elems ){
            if( !elem.attr("src").equals(elem.attr("abs:src")) ){
                elem.attr("src", elem.attr("abs:src"));
            }
        }
		parsing.setHtml(fullBody.toString());
		parsing.setTitle(fullBody.getElementsByTag("title").text());
		
		Integer pn = getSqlSession().selectOne("parsing.existParsingUrl", parsing);
		if(pn == null || pn.equals(0)){
			getSqlSession().insert("parsing.insertParsingUrl", parsing);			
		}else{
			parsing.setUrlPn(pn);
		}
		insertParsingVisit(parsing);
		insertParsingData(parsing);
		
		map.putAll(imageFilter.filtering(parsing, fullBody));	
		map.put("url", parsing.getUrl());
		insertParsingImageUrl((List<Image>) map.get("images"));
		
		map.putAll(titleFilter.filtering(parsing, fullBody));
		
		return map;
	}
	
	@Override
	public Map<String, Object> insertAnalysisData(Parsing parsing) {
		Integer pn = getSqlSession().selectOne("parsing.existParsingUrl", parsing);
		if(pn == null || pn.equals(0)){
			getSqlSession().insert("parsing.insertParsingUrl", parsing);			
		}else{
			parsing.setUrlPn(pn);
		}
		insertParsingVisit(parsing);
		insertParsingData(parsing);
			
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pn", pn);
		map.put("visitPn", parsing.getPn());
		return map;
	}
	
	@Override
	public void insertImage(Image image) {
		getSqlSession().insert("parsing.insertParsingImageOne", image);
	}
	
	@Override
	public String selectDomainFromVisitPn(Integer visitPn){
		return getSqlSession().selectOne("parsing.selectUrlFromVisitPn", visitPn);
	}
	
	private void insertParsingVisit(Parsing parsing) {
		getSqlSession().insert("parsing.insertParsingVisit", parsing);
	}
	
	private void insertParsingData(Parsing parsing) {
		getSqlSession().insert("parsing.insertParsingData", parsing);
	}
	
	private void insertParsingImageUrl(List<Image> images) {
		if (images.size() > 0)
			getSqlSession().insert("parsing.insertParsingImageUrl", images);
	}

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
//		String html = getSqlSession().selectOne("parsing.selectDetailInformation", parsing);
//		Document document = Jsoup.parse(html);
		
		Map<String, Object> map = new HashMap<String, Object>();
//		map.putAll(imageFilter.filtering(parsing, document));
		map.put("images", getSqlSession().selectList("parsing.selectDetailInfoImages", parsing.getPn()));
//		map.put("imagesHtml", html);
//		map.putAll(titleFilter.filtering(parsing, document));
		return map;
	}	
	
}
