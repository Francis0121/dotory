package net.epril.dotori.parsing;

/**
 * 파싱 URL 구조
 * 
 * @author Francis
 * @version v0.1
 * @since 14.08.09
 */
public class Parsing {

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

	public Parsing() {
		super();
		this.userPn = 1;
	}

	public Integer getCount() {
		return count;
	}

	public String getHtml() {
		return html;
	}

	public Integer getPn() {
		return pn;
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

	public void setHtml(String html) {
		this.html = html;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
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
		return "Parsing [pn=" + pn + ", urlPn=" + urlPn + ", userPn=" + userPn
				+ ", url=" + url + ", title=" + title + ", html=" + html
				+ ", count=" + count + "]";
	}

}
