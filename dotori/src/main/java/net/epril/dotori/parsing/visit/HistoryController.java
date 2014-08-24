package net.epril.dotori.parsing.visit;

import java.util.Map;

import javax.inject.Inject;

import net.epril.dotori.json.AJC;
import net.epril.dotori.json.Json;
import net.epril.dotori.parsing.Parsing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HistoryController {

	@Inject
	private HistoryService historyService;
	
	@ResponseBody
	@RequestMapping(value="/visit/info", method=RequestMethod.POST)
	public Json postVisitInfo(@RequestBody VisitFilter visitFilter){
		Map<String, Object> map = historyService.selectVisitInformation(visitFilter);
		return new Json(AJC.SUCCESS, "", map);
	}
	
	@ResponseBody
	@RequestMapping(value="/image/list", method=RequestMethod.GET)
	public Json postImageList(@ModelAttribute ImageSearchFilter imageSearchFilter){
		Map<String, Object> map = historyService.selectImageList(imageSearchFilter);
		return new Json(AJC.SUCCESS, "", map);
	}
	
	@ResponseBody
	@RequestMapping(value="/colors", method=RequestMethod.GET)
	public Json getColors(){
		Map<String, Object> map = historyService.selectColors();
		return new Json(AJC.SUCCESS, "", map);
	}
	
	@ResponseBody
	@RequestMapping(value="/history/total",method=RequestMethod.GET)
	public Json getHistoryTotal(@ModelAttribute Parsing parsing){
		Map<String,Object> map=historyService.selectHistoryTotal(parsing.getUserPn());
		return new Json(AJC.SUCCESS,"",map);		
	}
	
	@ResponseBody
	@RequestMapping(value="/history/keyword",method=RequestMethod.GET)
	public Json getHistoryKeyword(@ModelAttribute KeywordFilter keywordFilter){
		Map<String,Object> map=historyService.selectHistoryKeyword(keywordFilter);
		return new Json(AJC.SUCCESS,"",map);		
	}
	
	@ResponseBody
	@RequestMapping(value="/history/date",method=RequestMethod.GET)
	public Json getHistoryDate(@ModelAttribute HistoryFilter historyFilter){
		Map<String,Object> map=historyService.selectHistoryDate(historyFilter);
		return new Json(AJC.SUCCESS,"",map);		
	}
}
