package net.epril.dotori.parsing.visit;

import net.epril.dotori.util.AbstractListFilter;
import net.epril.dotori.util.DateUtil;

public class KeywordFilter extends AbstractListFilter{

	private Integer userPn;

	private String date;
	
	public KeywordFilter() {
		super();
		this.date = DateUtil.getToday("DD-MM-YYYY");
		// TODO Auto-generated constructor stub
	}

	public KeywordFilter(Integer userPn) {
		super();
		this.userPn = userPn;
		this.date = DateUtil.getToday("DD-MM-YYYY");
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
