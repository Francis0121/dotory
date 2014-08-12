package net.epril.dotori.parsing.visit;

import net.epril.dotori.util.AbstractListFilter;

public class VisitFilter extends AbstractListFilter {

	private Integer userPn;

	public VisitFilter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public VisitFilter(Integer userPn) {
		super();
		this.userPn = userPn;
	}

	public Integer getUserPn() {
		return userPn;
	}

	public void setUserPn(Integer userPn) {
		this.userPn = userPn;
	}

	@Override
	public String toString() {
		return "UserFilter [userPn=" + userPn + "]";
	}

}
