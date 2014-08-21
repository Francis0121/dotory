package net.epril.dotori.parsing;

public class Color {

	private Integer pn;

	private String koName;

	private String enName;

	private String rgb;

	public Color() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Color(Integer pn, String koName, String enName, String rgb) {
		super();
		this.pn = pn;
		this.koName = koName;
		this.enName = enName;
		this.rgb = rgb;
	}

	public String getEnName() {
		return enName;
	}

	public String getKoName() {
		return koName;
	}

	public Integer getPn() {
		return pn;
	}

	public String getRgb() {
		return rgb;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	public void setKoName(String koName) {
		this.koName = koName;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
	}

	public void setRgb(String rgb) {
		this.rgb = rgb;
	}

	@Override
	public String toString() {
		return "Color [pn=" + pn + ", koName=" + koName + ", enName=" + enName
				+ ", rgb=" + rgb + "]";
	}

}
