package net.epril.dotori.parsing.visit;

import net.epril.dotori.util.AbstractListFilter;

public class ImageSearchFilter extends AbstractListFilter {
	
	private Integer userPn;

	public ImageSearchFilter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ImageSearchFilter(Integer userPn) {
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
		return "ImageSearchFilter [userPn=" + userPn + "]";
	}

}
