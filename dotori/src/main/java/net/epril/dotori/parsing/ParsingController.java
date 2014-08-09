package net.epril.dotori.parsing;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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

	@Inject
	private ParsingService parsingService;
	
}
