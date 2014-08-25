package net.epril.dotori.parsing;

import java.util.List;

/**
 * 파싱 URL 구조
 * 
 * @author Francis
 * @version v0.1
 * @since 14.08.09
 */
public class Parsing {

	/**
	 * 키워드 고유번호
	 */
	private Integer keywordpn;

	/**
	 * 방문 고유번호
	 */
	private Integer pn;

	/**
	 * url 고유번호
	 */
	private Integer urlPn;

	/**
	 * 사용자 고유번호
	 */
	private Integer userPn;

	/**
	 * 파싱 URL
	 */
	private String url;

	/**
	 * 도메인
	 */
	private String domain;

	/**
	 * 파싱 URL title
	 */
	private String title;

	/**
	 * 파싱 URL 전문
	 */
	private String html;

	/**
	 * 파싱 URL Count
	 */
	private Integer count;

	/**
	 * src List
	 */
	private List<String> srcs;

	/**
	 * faviconUrl
	 */
	private String favicon;

	/**
	 * Keyword
	 */
	private String keyword;

	/**
	 * Frame Url
	 */
	private List<String> frameSrcs;

	public Parsing() {
		super();
		this.userPn = 1;
	}

	public Integer getCount() {
		return count;
	}

	public String getDomain() {
		return domain;
	}

	public String getFavicon() {
		return favicon;
	}

	public List<String> getFrameSrcs() {
		return frameSrcs;
	}

	public String getHtml() {
		return html;
	}

	public String getKeyword() {
		return keyword;
	}

	public Integer getKeywordpn() {
		return keywordpn;
	}

	public Integer getPn() {
		return pn;
	}

	public List<String> getSrcs() {
		return srcs;
	}

	public String getTitle() {
		return title;
	}

	public String getUrl() {
		return url;
	}

	public Integer getUrlPn() {
		return urlPn;
	}

	public Integer getUserPn() {
		return userPn;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public void setFavicon(String favicon) {
		this.favicon = favicon;
	}

	public void setFrameSrcs(List<String> frameSrcs) {
		this.frameSrcs = frameSrcs;
	}

	public void setHtml(String html) {
		this.html = html;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public void setKeywordpn(Integer keywordpn) {
		this.keywordpn = keywordpn;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
	}

	public void setSrcs(List<String> srcs) {
		this.srcs = srcs;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setUrlPn(Integer urlPn) {
		this.urlPn = urlPn;
	}

	public void setUserPn(Integer userPn) {
		this.userPn = userPn;
	}

	@Override
	public String toString() {
		return "Parsing [keywordpn=" + keywordpn + ", pn=" + pn + ", urlPn="
				+ urlPn + ", userPn=" + userPn + ", url=" + url + ", domain="
				+ domain + ", title=" + title + ", html=" + html + ", count="
				+ count + ", srcs=" + srcs + ", favicon=" + favicon
				+ ", keyword=" + keyword + ", frameSrcs=" + frameSrcs + "]";
	}

}
