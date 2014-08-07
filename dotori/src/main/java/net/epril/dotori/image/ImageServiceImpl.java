package net.epril.dotori.image;

import java.util.List;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl extends SqlSessionDaoSupport implements ImageService{

	private static Logger logger = LoggerFactory.getLogger(ImageServiceImpl.class);
	
	public void selectTest(){
		List<Image> temp = getSqlSession().selectList("temp.getTemp");
		
		logger.info(temp.toString());
	}
}
