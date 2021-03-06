package net.epril.dotori.regex;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @author Francis
 * @version v0.1
 * @since 14.08.08
 */
@Service
public class RegexServiceImpl extends SqlSessionDaoSupport implements
		RegexService {
	
	private static Logger logger = LoggerFactory.getLogger(RegexServiceImpl.class);
	
	private static final String REPLACE_LETTER = "RPLETTER";
	
	private static final String[] REGEXES_IMAGE_TAG = {	"\\<RPLETTER( .*)?\\>.*\\<\\/RPLETTER\\>",
														"\\<RPLETTER( .*)?\\>[\\w\\W]*?\\<\\/RPLETTER\\>"	};
	
	private static final String REGEX_IMAGE_ID = ".*RPLETTER.*";
	
	private static final String REGEX_IMAGE_CLASS = ".*RPLETTER.*";
	
	private static final String[] REGEXES_TITLE_TAG = {	"\\<RPLETTER( .*)?\\>.*\\<\\/RPLETTER\\>",
														"\\<RPLETTER( .*)?\\>[\\w\\W]*?\\<\\/RPLETTER\\>"	};
	
	@Override
	public List<String> makeImageRegexList(Regex regex){
	
		List<String> strRegexs = new ArrayList<String>();
		List<Regex> regexs = selectRegex(regex);
		
		logger.debug(regexs.toString());
		
		switch (regex.getGroupPn()) {
		case 1:// TAG
			for (Regex r : regexs) {
				strRegexs.add(REGEXES_IMAGE_TAG[0].replaceAll(REPLACE_LETTER, r.getShape()));
				strRegexs.add(REGEXES_IMAGE_TAG[1].replaceAll(REPLACE_LETTER, r.getShape()));
			}
			break;
		case 2:// ID
			for(Regex r : regexs){
				strRegexs.add(REGEX_IMAGE_ID.replaceAll(REPLACE_LETTER, r.getShape()));
			}
			break;
		case 3:// ClASS
			for(Regex r : regexs){
				strRegexs.add(REGEX_IMAGE_CLASS.replaceAll(REPLACE_LETTER, r.getShape()));
			}
			break;
		}
		
		logger.debug("String Regex List \n" +strRegexs);
		
		return strRegexs;
	}
	
	@Override
	public Map<String, Object> selectAll(Regex regex) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Regex> tags = selectRegex(new Regex(0, RegexUtil.REGEX_GROUP_TAG, regex.getRegexCategory()));
		map.put("tags", tags);
		List<Regex> deletes = selectRegex(new Regex(0, RegexUtil.REGEX_GROUP_DELETE, regex.getRegexCategory()));
		map.put("deletes", deletes);
		List<Regex> selects = selectRegex(new Regex(0, RegexUtil.REGEX_GROUP_SELECT, regex.getRegexCategory()));
		map.put("selects", selects);
		List<Regex> selTags = selectRegex(new Regex(0, RegexUtil.REGEX_GROUP_SELECT_TAG, regex.getRegexCategory()));
		map.put("selTags", selTags);
		List<Regex> srcs = selectRegex(new Regex(0, RegexUtil.REGEX_GROUP_SRC, regex.getRegexCategory()));
		map.put("srcs", srcs);
		return map;
	}
	
	@Override
	public List<String> makeTitleRegexList(Regex regex) {
		List<String> strRegexs = new ArrayList<String>();
		List<Regex> regexs = selectRegex(regex);
		
		logger.debug(regexs.toString());
		
		switch (regex.getGroupPn()) {
		case 1:// TAG
			for (Regex r : regexs) {
				strRegexs.add(REGEXES_TITLE_TAG[0].replaceAll(REPLACE_LETTER, r.getShape()));
				strRegexs.add(REGEXES_TITLE_TAG[1].replaceAll(REPLACE_LETTER, r.getShape()));
			}
			break;
		case 2:// ID
			break;
		case 3:// ClASS
			break;
		}
		
		logger.debug("String Regex List \n" +strRegexs);
		
		return strRegexs;
	}
	
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
