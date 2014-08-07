package net.epril.dotori;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.inject.Inject;

import net.epril.dotori.image.Image;
import net.epril.dotori.image.ImageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Inject
	private ImageService imageService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		imageService.selectTest();
		
		return "home";
	}
	
	@ResponseBody
	@RequestMapping(value = "/json", method = RequestMethod.GET)
	public Image getJson(){
		logger.info("Get Success!");
		return new Image(1, "KIM김");
	}
	
	@ResponseBody
	@RequestMapping(value = "/json", method = RequestMethod.POST)
	public void postJson(@RequestBody Image image){
		logger.info("POST Success!");
		logger.info(image.toString());
	}
	
}
