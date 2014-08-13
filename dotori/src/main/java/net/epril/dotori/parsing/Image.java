package net.epril.dotori.parsing;

public class Image {

	private Integer visitPn;

	private String url;

	private String link;

	private Integer width;

	private Integer height;

	private Integer color;

	public Image() {
		super();
	}

	public Image(Integer visitPn, String url, Integer width, Integer height,
			Integer color) {
		super();
		this.visitPn = visitPn;
		this.url = url;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	@Override
	public boolean equals(Object obj) {
		boolean equalFlag = false;

		if (obj != null && obj instanceof Image) {
			equalFlag = this.url == ((Image) obj).getUrl();
		}

		return equalFlag;
	}

	public Integer getColor() {
		return color;
	}

	public Integer getHeight() {
		return height;
	}

	public String getLink() {
		return link;
	}

	public String getUrl() {
		return url;
	}

	public Integer getVisitPn() {
		return visitPn;
	}

	public Integer getWidth() {
		return width;
	}

	public void setColor(Integer color) {
		this.color = color;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setVisitPn(Integer visitPn) {
		this.visitPn = visitPn;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	@Override
	public String toString() {
		return "Image [visitPn=" + visitPn + ", url=" + url + ", link=" + link
				+ ", width=" + width + ", height=" + height + ", color="
				+ color + "]";
	}

}
