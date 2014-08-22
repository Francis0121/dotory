package net.epril.dotori.parsing.visit;

import net.epril.dotori.util.AbstractListFilter;

public class HistoryFilter extends AbstractListFilter{
	private Integer userPn;
	private String date;
	private Integer count;

	public HistoryFilter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public HistoryFilter(Integer userPn) {
		super();
		this.userPn = userPn;
	}

	public Integer getCount() {
		return count;
	}

	public String getDate() {
		return date;
	}

	public Integer getUserPn() {
		return userPn;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setUserPn(Integer userPn) {
		this.userPn = userPn;
	}

	@Override
	public String toString() {
		return "HistoryFilter [userPn=" + userPn + ", date=" + date
				+ ", count=" + count + "]";
	}
	
}
