package net.epril.dotori.parsing;

import net.epril.dotori.util.AbstractListFilter;

public class ParsingFilter extends AbstractListFilter {

	private Integer userPn;

	public ParsingFilter() {
		super();
		this.userPn = 1;
	}

	public Integer getUserPn() {
		return userPn;
	}

	public void setUserPn(Integer userPn) {
		this.userPn = userPn;
	}

	@Override
	public String toString() {
		return "ParsingFilter [userPn=" + userPn + "]";
	}

}
