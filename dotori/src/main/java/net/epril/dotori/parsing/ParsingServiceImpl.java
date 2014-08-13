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

		Document fullBody = Jsoup.connect(parsing.getUrl())
				.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36")
				.get();
		parsing.setHtml(fullBody.toString());
		parsing.setTitle(fullBody.getElementsByTag("title").text());

		// ~ URL, Visit, Data 
		Pattern pattern = Pattern.compile("^(http|https):\\/\\/([a-z0-9-_\\.]*)[\\/\\?]");
		Matcher matcher = pattern.matcher(parsing.getUrl());
		if(matcher.find()){
			String domain = matcher.group();
			parsing.setDomain(domain);
		}
		
		Integer pn = getSqlSession().selectOne("parsing.existParsingUrl", parsing);
		if(pn == null || pn.equals(0)){
			getSqlSession().insert("parsing.insertParsingUrl", parsing);			
		}else{
			parsing.setUrlPn(pn);
		}
		insertParsingVisit(parsing);
		insertParsingData(parsing);
		
		map.putAll(imageFilter.filtering(parsing, fullBody));		
		insertParsingImageUrl((List<Image>) map.get("images"));
		
		map.putAll(titleFilter.filtering(parsing, fullBody));
		
		return map;
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
		String html = getSqlSession().selectOne("parsing.selectDetailInformation", parsing.getPn());
		Document document = Jsoup.parse(html);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.putAll(imageFilter.filtering(parsing, document));
		map.putAll(titleFilter.filtering(parsing, document));
		return map;
	}	
	
}
