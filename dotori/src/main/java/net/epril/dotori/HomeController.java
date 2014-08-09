package net.epril.dotori;

import java.util.Locale;

import net.epril.dotori.image.Image;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory
			.getLogger(HomeController.class);

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {

		return "home";
	}

	@ResponseBody
	@RequestMapping(value = "/json", method = RequestMethod.GET)
	public Image getJson() {
		logger.info("Get Success!");
		return new Image(1, "KIM김");
	}

	@ResponseBody
	@RequestMapping(value = "/json", method = RequestMethod.POST)
	public void postJson(@RequestBody Image image) {
		logger.info("POST Success!");
		logger.info(image.toString());
	}

}
