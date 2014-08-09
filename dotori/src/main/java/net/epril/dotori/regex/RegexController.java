package net.epril.dotori.regex;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 정규식 수정을 편하게 하기 위한 페이지 Ajax 처리x
 * 
 * @author Francis
 * 
 */
@Controller
@RequestMapping(value = "regex")
public class RegexController {

	@Inject
	private RegexService regexService;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String showRegexPage(Model model) {
		Regex regex = new Regex();
		regex.setRegexCategory(1);
		regex.setPn(1);
		
		model.addAttribute("regexGroup", regexService.selectRegexGroup());
		model.addAttribute("regexList", regexService.selectRegex(regex));
		
		return "regex/list";
	}
}
