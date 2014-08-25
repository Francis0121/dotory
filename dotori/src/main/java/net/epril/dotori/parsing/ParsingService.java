package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @author Francis
 * @version v0.1
 * @since 14.08.08 
 */
public interface ParsingService {

	Map<String, Object> controlParsingData(Parsing parsing) throws Exception;

	Map<String, Object> selectParsingList(ParsingFilter parsingFilter);

	Map<String, Object> selectDetailInformation(Parsing parsing);
	
	String selectDomainFromVisitPn(Integer visitPn);
	
	Map<String, Object> insertAnalysisData(Parsing parsing) throws IOException;

	void insertImage(Image image);

	void insertImages(List<Image> images);
}
