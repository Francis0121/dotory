package net.epril.dotori;

import java.util.Locale;

import net.epril.dotori.json.Json;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

	private static Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {

		return "home";
	}
	
	@ResponseBody
	@RequestMapping(value="/background", method=RequestMethod.GET)
	public Json getBackground(){
		logger.debug("Background Accsss Success");
		return new Json(200,"success");
	}

}
