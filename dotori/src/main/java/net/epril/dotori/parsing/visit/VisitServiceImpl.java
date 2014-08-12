package net.epril.dotori.parsing.visit;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.epril.dotori.parsing.Parsing;
import net.epril.dotori.util.Pagination;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;

@Service
public class VisitServiceImpl extends SqlSessionDaoSupport implements
		VisitService {

	@Override
	public Map<String, Object> visitInformation(VisitFilter visitFilter) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("visits", selectVisits(visitFilter));
		return map;
	}
	
	private Integer selectVisitCount(VisitFilter visitFilter){
		return getSqlSession().selectOne("visit.selectVisitCount", visitFilter);
	}
	
	private List<Parsing> selectVisits(VisitFilter visitFilter){
		Pagination pagination = visitFilter.getPagination();
		int count = selectVisitCount(visitFilter);
		if(count == 0){
			return new ArrayList<Parsing>();
		}
		pagination.setNumItems(count);
	
		List<Parsing> parsings = getSqlSession().selectList("visit.selectVisits", visitFilter);
		return parsings;
	}

}
