package net.epril.dotori.parsing;

public class Image {

	private Integer parsingPn;

	private String url;

	private Integer width;

	private Integer height;

	private Integer color;

	public Image() {
		super();
	}

	public Image(Integer parsingPn, String url, Integer width, Integer height,
			Integer color) {
		super();
		this.parsingPn = parsingPn;
		this.url = url;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	public Integer getColor() {
		return color;
	}

	public Integer getHeight() {
		return height;
	}

	public Integer getParsingPn() {
		return parsingPn;
	}

	public String getUrl() {
		return url;
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

	public void setParsingPn(Integer parsingPn) {
		this.parsingPn = parsingPn;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	@Override
	public boolean equals(Object obj) {
		boolean equalFlag = false;

        if (obj != null && obj instanceof Image){
            equalFlag = this.url == ((Image) obj).getUrl();
        }

        return equalFlag;
	}
	
	@Override
	public String toString() {
		return "Image [parsingPn=" + parsingPn + ", url=" + url + ", width="
				+ width + ", height=" + height + ", color=" + color + "]";
	}

}
