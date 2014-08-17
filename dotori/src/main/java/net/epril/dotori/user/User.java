package net.epril.dotori.user;

public class User {

	/**
	 * User Primaary Key
	 */
	private Integer pn;

	/**
	 * Google Oauth Primary Key
	 */
	private String data;

	public User() {
		super();
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Integer getPn() {
		return pn;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
	}

	@Override
	public String toString() {
		return "User [pn=" + pn + ", data=" + data + "]";
	}

}
