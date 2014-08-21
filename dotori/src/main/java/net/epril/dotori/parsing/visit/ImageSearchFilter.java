package net.epril.dotori.parsing.visit;

import net.epril.dotori.util.AbstractListFilter;
import net.epril.dotori.util.DateUtil;

public class ImageSearchFilter extends AbstractListFilter {

	private Integer userPn;

	/**
	 * Start Date
	 */
	private String from;

	/**
	 * End Date
	 */
	private String to;

	private Integer width;

	private Integer height;

	private Integer color;

	public ImageSearchFilter() {
		super();
		this.to = DateUtil.getToday("DD-MM-YYYY");
		this.from = DateUtil.getDayString(DateUtil.addYearMonthDay(DateUtil.getToday("YYYYMMDD"), 0, 0, -7), "DD-MM-YYYY");
		this.width = 150;
		this.height = 100;
	}

	public ImageSearchFilter(Integer userPn, String from, String to,
			Integer width, Integer height, Integer color) {
		super();
		this.userPn = userPn;
		this.from = from;
		this.to = to;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	public Integer getColor() {
		return color;
	}

	public String getFrom() {
		return from;
	}

	public Integer getHeight() {
		return height;
	}

	public String getTo() {
		return to;
	}

	public Integer getUserPn() {
		return userPn;
	}

	public Integer getWidth() {
		return width;
	}

	public void setColor(Integer color) {
		this.color = color;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public void setUserPn(Integer userPn) {
		this.userPn = userPn;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	@Override
	public String toString() {
		return "ImageSearchFilter [userPn=" + userPn + ", from=" + from
				+ ", to=" + to + ", width=" + width + ", height=" + height
				+ ", color=" + color + "]";
	}

}
