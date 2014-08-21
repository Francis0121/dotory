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
		pagination.setNumItemsPerPage(20);
		
		List<Image> images = getSqlSession().selectList("history.selectImages", imageSearchFilter);
		return images;
	}
	
	@Override
	public Map<String, Object> selectColors() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("colors", getSqlSession().selectList("history.selectColors"));
		return map;
	}
}
