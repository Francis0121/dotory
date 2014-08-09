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
	 * 파싱 URL 고유번호
	 */
	private Integer pn;

	/**
	 * 사용자 고유번호
	 */
	private String userPn;

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
	private String text;

	public Parsing() {
		super();
	}

	public Integer getPn() {
		return pn;
	}

	public String getText() {
		return text;
	}

	public String getTitle() {
		return title;
	}

	public String getUrl() {
		return url;
	}

	public String getUserPn() {
		return userPn;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setUserPn(String userPn) {
		this.userPn = userPn;
	}

	@Override
	public String toString() {
		return "Parsing [pn=" + pn + ", userPn=" + userPn + ", url=" + url
				+ ", title=" + title + ", text=" + text + "]";
	}

}
