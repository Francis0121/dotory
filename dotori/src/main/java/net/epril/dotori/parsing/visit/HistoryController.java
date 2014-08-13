package net.epril.dotori.parsing.visit;

import java.util.Map;

import javax.inject.Inject;

import net.epril.dotori.json.AJC;
import net.epril.dotori.json.Json;

import org.springframework.stereotype.Controller;
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
	@RequestMapping(value="/image/list", method=RequestMethod.POST)
	public Json postImageList(@RequestBody ImageSearchFilter imageSearchFilter){
		Map<String, Object> map = historyService.selectImageList(imageSearchFilter);
		return new Json(AJC.SUCCESS, "", map);
	}
}
