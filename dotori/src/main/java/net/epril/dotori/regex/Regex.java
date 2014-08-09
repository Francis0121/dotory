package net.epril.dotori.regex;

/**
 * @author Francis
 * @version v0.1
 * @since 14.08.08
 */
public class Regex {

	/**
	 * 정규 표현식 그룹 고유번호
	 */
	private Integer pn;

	/**
	 * Image, Title 선택 조건
	 */
	private Integer regexCategory;

	/**
	 * 정규 표현식 그룹 이름
	 */
	private String name;

	/**
	 * 정규 표현식 형태
	 */
	private String shape;

	public Regex() {
		super();
	}

	public String getName() {
		return name;
	}

	public Integer getPn() {
		return pn;
	}

	public Integer getRegexCategory() {
		return regexCategory;
	}

	public String getShape() {
		return shape;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPn(Integer pn) {
		this.pn = pn;
	}

	public void setRegexCategory(Integer regexCategory) {
		this.regexCategory = regexCategory;
	}

	public void setShape(String shape) {
		this.shape = shape;
	}

	@Override
	public String toString() {
		return "Regex [pn=" + pn + ", regexCategory=" + regexCategory
				+ ", name=" + name + ", shape=" + shape + "]";
	}

}
