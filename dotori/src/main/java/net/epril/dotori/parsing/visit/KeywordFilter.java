package net.epril.dotori.parsing.visit;

import net.epril.dotori.util.AbstractListFilter;

public class KeywordFilter extends AbstractListFilter{

	private Integer userPn;

	private String date;
	
	public KeywordFilter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public KeywordFilter(Integer userPn) {
		super();
		this.userPn = userPn;
	}

	public String getDate() {
		return date;
	}

	public Integer getUserPn() {
		return userPn;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setUserPn(Integer userPn) {
		this.userPn = userPn;
	}

	@Override
	public String toString() {
		return "KeywordFilter [userPn=" + userPn + ", date=" + date + "]";
	}

	
}
