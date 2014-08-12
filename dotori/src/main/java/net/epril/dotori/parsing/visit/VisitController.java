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
@RequestMapping("visit")
public class VisitController {

	@Inject
	private VisitService visitService;
	
	@ResponseBody
	@RequestMapping(value="/info", method=RequestMethod.POST)
	public Json postVisitInfo(@RequestBody VisitFilter visitFilter){
		Map<String, Object> map = visitService.visitInformation(visitFilter);
		return new Json(AJC.SUCCESS, "", map);
	}
}
