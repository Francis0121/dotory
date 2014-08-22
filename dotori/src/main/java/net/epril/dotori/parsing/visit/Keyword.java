package net.epril.dotori.parsing.visit;

public class Keyword {
	private String title;
	private String date;
	private String favicon;
	private String domain;
	private String keyword;
	private Integer keywordPn;
	private String url;

	public Keyword() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getDate() {
		return date;
	}

	public String getDomain() {
		return domain;
	}

	public String getFavicon() {
		return favicon;
	}

	public String getKeyword() {
		return keyword;
	}

	public Integer getKeywordPn() {
		return keywordPn;
	}

	public String getTitle() {
		return title;
	}

	public String getUrl() {
		return url;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public void setFavicon(String favicon) {
		this.favicon = favicon;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public void setKeywordPn(Integer keywordPn) {
		this.keywordPn = keywordPn;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "Keyword [title=" + title + ", date=" + date + ", favicon="
				+ favicon + ", domain=" + domain + ", keyword=" + keyword
				+ ", keywordPn=" + keywordPn + ", url=" + url + "]";
	}

}
