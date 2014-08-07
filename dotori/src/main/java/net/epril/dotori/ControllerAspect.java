package net.epril.dotori;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Component;

@Aspect
@Component
public class ControllerAspect {

	private final Logger logger = LoggerFactory
			.getLogger(ControllerAspect.class);

	@Around("bean(*Controller)")
	public Object trace(ProceedingJoinPoint joinPoint) throws Throwable {
		String signatureString = joinPoint.getSignature().toShortString();
		logger.info(signatureString + " 시작");
		long start = System.currentTimeMillis();

		try {

			logger.info("Aspect Test");

			return joinPoint.proceed();
		} finally {
			long finish = System.currentTimeMillis();
			logger.info(signatureString + " 종료");
			logger.info(signatureString + " 실행 시간 : " + (finish - start) + "ms");
		}
	}

}
