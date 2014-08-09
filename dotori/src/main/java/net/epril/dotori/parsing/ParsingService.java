package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.Map;

/**
 * @author Francis
 * @version v0.1
 * @since 14.08.08 
 */
public interface ParsingService {

	Map<String, Object> controlParsingData(Parsing parsing) throws IOException;

}
