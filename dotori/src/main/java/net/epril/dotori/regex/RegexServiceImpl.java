package net.epril.dotori.regex;

import java.util.List;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;

/**
 * @author Francis
 * @version v0.1
 * @since 14.08.08
 */
@Service
public class RegexServiceImpl extends SqlSessionDaoSupport implements
		RegexService {

	@Override
	public List<Regex> selectRegexGroup() {
		return getSqlSession().selectList("regex.selectRegexGroup");
	}

	@Override
	public List<Regex> selectRegex(Regex regex) {
		return getSqlSession().selectList("regex.selectRegexImage", regex);
	}

	@Override
	public void insertRegexImage(Regex regex) {
		getSqlSession().insert("regex.insertRegexImage", regex);
	}

	@Override
	public void deleteRegexImage(Regex regex) {
		getSqlSession().delete("regex.deleteRegexImage", regex);
	}

	@Override
	public void updateRegexImage(Regex regex) {
		getSqlSession().update("regex.updateRegexImage", regex);
	}
}
