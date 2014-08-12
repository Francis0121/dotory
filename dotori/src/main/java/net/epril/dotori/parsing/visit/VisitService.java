package net.epril.dotori.parsing.visit;

import java.util.Map;

public interface VisitService {

	Map<String, Object> visitInformation(VisitFilter visitFilter);

}
