package net.epril.dotori.parsing.visit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.epril.dotori.parsing.Image;
import net.epril.dotori.parsing.Parsing;
import net.epril.dotori.util.Pagination;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;

@Service
public class HistoryServiceImpl extends SqlSessionDaoSupport implements
		HistoryService {

	@Override
	public Map<String, Object> selectVisitInformation(VisitFilter visitFilter) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("visits", selectVisits(visitFilter));
		return map;
	}
	
	private Integer selectVisitCount(VisitFilter visitFilter){
		return getSqlSession().selectOne("history.selectVisitCount", visitFilter);
	}
	
	private List<Parsing> selectVisits(VisitFilter visitFilter){
		Pagination pagination = visitFilter.getPagination();
		int count = selectVisitCount(visitFilter);
		if(count == 0){
			return new ArrayList<Parsing>();
		}
		pagination.setNumItems(count);
	
		List<Parsing> parsings = getSqlSession().selectList("history.selectVisits", visitFilter);
		return parsings;
	}

	@Override
	public Map<String, Object> selectImageList(
			ImageSearchFilter imageSearchFilter) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("images", selectImages(imageSearchFilter));
		map.put("imageSearchFilter", imageSearchFilter);
		return map;
	}
	
	private Integer selectImageCount(ImageSearchFilter imageSearchFilter){
		return getSqlSession().selectOne("history.selectImageCount", imageSearchFilter);
	}
	
	private List<Image> selectImages(ImageSearchFilter imageSearchFilter) {
		Pagination pagination = imageSearchFilter.getPagination();
		int count = selectImageCount(imageSearchFilter);
		if(count == 0){
			return new ArrayList<Image>();
		}
		pagination.setNumItems(count);
		pagination.setNumItemsPerPage(30);
		
		List<Image> images = getSqlSession().selectList("history.selectImages", imageSearchFilter);
		return images;
	}
	
	@Override
	public Map<String, Object> selectColors() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("colors", getSqlSession().selectList("history.selectColors"));
		return map;
	}
	@Override
	public Map<String, Object> selectHistoryTotal(Integer userPn) {
		KeywordFilter keywordFilter=new KeywordFilter(userPn);
		HistoryFilter historyFilter=new HistoryFilter(userPn);
		Map<String,Object> map= new HashMap<String, Object>();
		map.putAll(selectHistoryKeyword(keywordFilter));
		map.putAll(selectHistoryDate(historyFilter));
		map.put("historyFilter", historyFilter);
		return map;
	}
	
	@Override
	public Map<String, Object> selectHistoryKeyword(KeywordFilter keywordFilter) {
		Map<String,Object> map=new HashMap<String, Object>();
		List<Keyword> keywords = getSqlSession().selectList("history.selectHistoryKeyword", keywordFilter);
		map.put("keywords", keywords);
		return map;
	}
	
	@Override
	public Map<String, Object> selectHistoryDate(HistoryFilter historyFilter) {
		Pagination pagination = historyFilter.getPagination();
		Map<String,Object> map=new HashMap<String, Object>();
		int count = selectHistoryDateCount(historyFilter);
		if(count == 0){
			return map;
		}
		pagination.setNumItems(count);
		
		List<HDate> dates = getSqlSession().selectList("history.selectHistoryDate", historyFilter);
		map.put("dates", dates);
		return map;
		
	}

	private int selectHistoryDateCount(HistoryFilter historyFilter) {
		return getSqlSession().selectOne("history.selectHistoryDateCount",historyFilter);
	}
	
}
