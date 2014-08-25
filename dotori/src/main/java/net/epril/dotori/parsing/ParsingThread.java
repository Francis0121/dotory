package net.epril.dotori.parsing;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class ParsingThread implements Runnable {

	private static Logger logger = LoggerFactory.getLogger(ParsingThread.class);
	
	@Inject
	@Qualifier("imageFilter")
	private ImageFilter imageFilter;
	
	@Inject
	private ParsingService parsingService;
	
	private Parsing parsing;
 
	public void setParsing(Parsing parsing) {
		this.parsing = parsing;
	}

	@Override
	public void run() {
		long start = System.currentTimeMillis();
		logger.debug("Thread Start = " + parsing.toString());
		
		Map<String, Object> imageMap;
		try {
		
			imageMap = imageFilter.frameFiltering(parsing);
			@SuppressWarnings("unchecked")
			List<Image> images = (List<Image>) imageMap.get("images");

			logger.debug("images = " + images);
			parsingService.insertImages(images);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
 
		long finish = System.currentTimeMillis();
		logger.debug("Thread Finish" + (finish - start));
	}

}
