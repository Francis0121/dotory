package net.epril.dotori.user;

import java.util.Map;

import javax.inject.Inject;

import net.epril.dotori.json.AJC;
import net.epril.dotori.json.Json;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

	private static Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Inject
	private UserService userService;

	@ResponseBody
	@RequestMapping(value = "/signin", method = RequestMethod.GET)
	public Json postSignin(@ModelAttribute User user) {
		Map<String, Object> map = userService.singin(user);		
		logger.debug(map.toString());
		return new Json(AJC.SUCCESS, "", map);
	}
}
