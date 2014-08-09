package net.epril.dotori.regex;

import java.util.List;

/**
 * @author Francis
 * @version v0.1
 * @since 14.08.08
 */
public interface RegexService {

	/**
	 * @return 정규표현식 그룹 리턴
	 */
	public List<Regex> selectRegexGroup();

	/**
	 * @param regexPn
	 *            정규표현식 고유번호
	 * @return 정규표현식 고유번호에 대한 형태 리스트
	 */
	public List<Regex> selectRegex(Regex regex);

	/**
	 * @param regex
	 *            pn(group), shape 전달
	 */
	public void insertRegexImage(Regex regex);

	/**
	 * @param shapePn
	 *            정규표현식 형태 고유번호
	 */
	public void deleteRegexImage(Regex regex);

	/**
	 * @param regex
	 *            pn, shape 값 전달
	 */
	public void updateRegexImage(Regex regex);

}
