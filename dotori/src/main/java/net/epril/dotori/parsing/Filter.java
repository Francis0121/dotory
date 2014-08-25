package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.Map;

import org.jsoup.nodes.Document;

public interface Filter {

	public Map<String, Object> filtering(Parsing parsing, Document document);

	public Map<String, Object> frameFiltering(Parsing parsing) throws IOException;
}
