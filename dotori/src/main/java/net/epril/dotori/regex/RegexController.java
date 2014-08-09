package net.epril.dotori.regex;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
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

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String showRegexPage(Model model, @ModelAttribute Regex regex) {
		System.out.println(regex.toString());
		model.addAttribute("regexGroup", regexService.selectRegexGroup());
		System.out.println(regex.toString());
		model.addAttribute("regexList", regexService.selectRegex(regex));
		System.out.println(regex.toString());
		/** Model */
		model.addAttribute("postRegex", new Regex());
		model.addAttribute("deleteRegex", new Regex());
		model.addAttribute("putRegex", new Regex());
		return "regex";
	}
	
	@RequestMapping(value="/", method = RequestMethod.POST)
	public String postRegexPage(Model model, @ModelAttribute(value="postRegex") Regex regex){
		regexService.insertRegexImage(regex);
		return "redirect:/regex/?groupPn="+regex.getGroupPn()+"&regexCategory="+regex.getRegexCategory();
	}
	
	@RequestMapping(value="/", method = RequestMethod.DELETE)
	public String deleteRegexPage(Model model, @ModelAttribute(value="deleteRegex") Regex regex){
		regexService.deleteRegexImage(regex);
		return "redirect:/regex/?groupPn="+regex.getGroupPn()+"&regexCategory="+regex.getRegexCategory();
	}
	
	@RequestMapping(value="/", method = RequestMethod.PUT)
	public String putRegexPage(Model model, @ModelAttribute(value="putRegex") Regex regex){
		regexService.updateRegexImage(regex);
		return "redirect:/regex/?groupPn="+regex.getGroupPn()+"&regexCategory="+regex.getRegexCategory();
	}
	
}
