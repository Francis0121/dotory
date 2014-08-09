package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import net.epril.dotori.json.Json;
import net.epril.dotori.json.AJC;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 모든 URL 처리는 Ajax로 구현 각각 Main 페이지만 일반 접근
 * 
 * @author Francis
 * @version v0.1
 * @since 14.08.09
 */
@Controller
@RequestMapping("parsing")
public class ParsingController {

	private static Logger logger = LoggerFactory
			.getLogger(ParsingController.class);

	@Inject
	private ParsingService parsingService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String showParsingPage() {
		return "parsing";
	}

	@ResponseBody
	@RequestMapping(value = "/url", method = RequestMethod.POST)
	public Json postUrlData(@RequestBody Parsing parsing) {
		Map<String, Object> map;
		try {
			map = parsingService.controlParsingData(parsing);
		} catch (IOException e) {
			logger.error("Url Parsing Error : ", e);
			return new Json(AJC.IO_EXCEPTION_WARN, "");
		}		
		return new Json(AJC.SUCCESS, "", map);
	}
	
	@ResponseBody
	@RequestMapping(value="/list", method = RequestMethod.POST)
	public Json postUrlList(@RequestBody ParsingFilter parsingFilter){
		Map<String, Object> map = parsingService.selectParsingList(parsingFilter);
		return new Json(AJC.SUCCESS, "", map);
	}

}
