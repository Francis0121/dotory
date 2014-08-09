package net.epril.dotori.util;

/**
 * @author Francis
 * 
 */
public abstract class AbstractListFilter {
	/**
	 * 페이지 정보 객체
	 */
	private Pagination pagination = new Pagination();

	/**
	 * 현재 페이지
	 */
	public int getPage() {
		return pagination.getCurrentPage();
	}

	/**
	 * 페이지 정보 객체
	 */
	public Pagination getPagination() {
		return pagination;
	}

	/**
	 * 현재 페이지 지정
	 * 
	 * @param page
	 *            지정할 현재 페이지
	 */
	public void setPage(int page) {
		pagination.setCurrentPage(page);
	}

	/**
	 * 페이지 객체 재지정
	 * 
	 * @param pagination
	 *            새로운 페이지 객체
	 */
	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}
}
