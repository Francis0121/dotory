package net.epril.dotori.util;

/**
 * @author Francis
 * 
 */
public class Pagination {

	/**
	 * 페이지 당 글 수
	 */
	private int numItemsPerPage = 10;
	/**
	 * 블록 당 페이지 수
	 */
	private int numPagesPerScreen = 10;
	/**
	 * 총 글 수(마지막 글 번호)
	 */
	private int numItems;
	/**
	 * 현재 페이지 번호
	 */
	private int page = 1;

	/**
	 * 현재페이지 GET
	 * 
	 * @return 현재페이지
	 */
	public int getCurrentPage() {
		int page = this.page;
		if (page < 1) {
			page = 1;
		}
		int numPages = getNumPages();
		if (page > numPages) {
			page = numPages;
		}
		return page;
	}

	/**
	 * 요청페이지 시작 번호 GET
	 * 
	 * @return 요청페이지 글 시작번호
	 */
	public int getItemSeqBegin() {
		int page = getRequestedPage();
		int ipp = getNumItemsPerPage();
		return (page - 1) * ipp;
	}

	/**
	 * 요청페이지 끝 번호 GET
	 * 
	 * @return 요청페이지 글 끝 번호
	 */
	public int getItemSeqEnd() {
		int page = getRequestedPage();
		int ipp = getNumItemsPerPage();
		int nItems = getNumItems();
		if (nItems == 0) {
			return page * ipp;
		} else {
			return Math.min(nItems, page * ipp);
		}
	}

	/**
	 * 총 글 수 (마지막 글 번호)
	 * 
	 * @return 총 글 수
	 */
	public int getNumItems() {
		return numItems;
	}

	/**
	 * 페이지 당 글 수
	 * 
	 * @return 페이지 당 글 수
	 */
	public int getNumItemsPerPage() {
		return numItemsPerPage;
	}

	/**
	 * 총 페이지 수(마지막 페이지 번호) GET
	 * 
	 * @return 총 페이지 수
	 */
	public int getNumPages() {
		return (numItems - 1) / numItemsPerPage + 1;
	}

	/**
	 * 블록 당 페이지 수 GET
	 * 
	 * @return 블록 당 페이지 수
	 */
	public int getNumPagesPerScreen() {
		return numPagesPerScreen;
	}

	/**
	 * 페이지 시작 번호 GET
	 * 
	 * @return 페이지 시작 번호
	 */
	public int getPageBegin() {
		return (getCurrentPage() - 1) / getNumPagesPerScreen()
				* getNumPagesPerScreen() + 1;
	}

	/**
	 * 페이지 끝 번호 GET
	 * 
	 * @return 페이지 끝 번호
	 */
	public int getPageEnd() {
		int a = getNumPages();
		int b = getPageBegin() + getNumPagesPerScreen() - 1;
		return Math.min(a, b);
	}

	/**
	 * 요청페이지 GET
	 * 
	 * @return 요청 페이지
	 */
	public int getRequestedPage() {
		return this.page;
	}

	/**
	 * 현재 페이지 SET
	 * 
	 * @param currentPage
	 */
	public void setCurrentPage(int currentPage) {
		this.page = currentPage;
	}

	/**
	 * 총 글 수(마지막 글 번호) SET
	 * 
	 * @param numItems
	 */
	public void setNumItems(int numItems) {
		this.numItems = numItems;
	}

	/**
	 * 페이지 당 글 수 SET
	 * 
	 * @param numItemsPerPage
	 */
	public void setNumItemsPerPage(int numItemsPerPage) {
		this.numItemsPerPage = numItemsPerPage;
	}

	/**
	 * 스크린 당 페이지 수 SET
	 * 
	 * @param numPagesPerScreen
	 */
	public void setNumPagesPerScreen(int numPagesPerScreen) {
		this.numPagesPerScreen = numPagesPerScreen;
	}

	@Override
	public String toString() {
		return "Pagination [numItemsPerPage=" + numItemsPerPage
				+ ", numPagesPerScreen=" + numPagesPerScreen + ", numItems="
				+ numItems + ", page=" + page + "]";
	}

}
