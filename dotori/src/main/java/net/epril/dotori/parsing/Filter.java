package net.epril.dotori.parsing;

import java.util.Map;

import org.jsoup.nodes.Document;

public interface Filter {

	public Map<String, Object> filtering(Parsing parsing, Document document);
}
