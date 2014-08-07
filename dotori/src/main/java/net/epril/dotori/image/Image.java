package net.epril.dotori.image;

/**
 * @author Francis
 * 
 */
public class Image {

	private Integer pn;

	private String title;

	public Image() {
		super();
	}

	public Image(Integer pn, String title) {
		super();
		this.pn = pn;
		this.title = title;
	}

	public Integer getPn() {
		return pn;
	}

	public String getTitle() {
		return title;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "Image [pn=" + pn + ", title=" + title + "]";
	}

}
