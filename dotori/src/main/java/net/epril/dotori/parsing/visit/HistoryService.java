package net.epril.dotori.parsing.visit;

import java.util.Map;

public interface HistoryService {

	Map<String, Object> selectVisitInformation(VisitFilter visitFilter);

	Map<String, Object> selectImageList(ImageSearchFilter imageSearchFilter);

	Map<String, Object> selectColors();

}
