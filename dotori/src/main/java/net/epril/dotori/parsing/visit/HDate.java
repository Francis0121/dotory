package net.epril.dotori.parsing.visit;

public class HDate {

	private String date;

	private Integer count;

	public HDate() {
		super();
	}

	public HDate(String date, Integer count) {
		super();
		this.date = date;
		this.count = count;
	}

	public Integer getCount() {
		return count;
	}

	public String getDate() {
		return date;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "HDate [date=" + date + ", count=" + count + "]";
	}

}
