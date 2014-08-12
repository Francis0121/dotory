package net.epril.dotori.oauth;

public class User {

	private Integer pn;

	public User() {
		super();
	}

	public User(Integer pn) {
		super();
		this.pn = pn;
	}

	public Integer getPn() {
		return pn;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
	}

	@Override
	public String toString() {
		return "User [pn=" + pn + "]";
	}

}
