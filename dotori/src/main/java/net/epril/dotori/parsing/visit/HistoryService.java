package net.epril.dotori.parsing.visit;

import java.util.Map;

public interface HistoryService {

	Map<String, Object> selectVisitInformation(VisitFilter visitFilter);

	Map<String, Object> selectImageList(ImageSearchFilter imageSearchFilter);

	Map<String, Object> selectColors();

	Map<String, Object> selectHistoryTotal(Integer userPn);

	Map<String, Object> selectHistoryKeyword(KeywordFilter keywordFilter);

	Map<String, Object> selectHistoryDate(HistoryFilter historyFilter);

}
