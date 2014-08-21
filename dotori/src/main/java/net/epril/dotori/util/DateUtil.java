package net.epril.dotori.util;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 날짜 변환 Util
 * 
 * @author 김성근
 * 
 */
public class DateUtil {

	static String zone = "Asia/Seoul";

	/**
	 * 오늘의 Calendar를 가져옴
	 * 
	 * @return 해당 년도
	 */
	public static Calendar getCalendar() {
		TimeZone tz = TimeZone.getTimeZone(zone);
		Calendar cal = new GregorianCalendar(tz);
		return cal;
	}

	/**
	 * 10일 미만의 날은 앞에 0을 붙여주는 함수(2자리수 유지를 위함)
	 * 
	 * @param day
	 * @return
	 */
	public static String dayIntToString(int day) {
		if (day < 10) {
			return "0" + String.valueOf(day);
		} else {
			return String.valueOf(day);
		}
	}

	/**
	 * 20110204 형식이 날짜를 받아서 2011/1형식으로 나타나게해줌
	 * 
	 * @param date
	 *            20110204 형식이 String 날짜
	 * @return 2011/1 과같은 년도와 분기형식
	 */
	public static String dateToYearAndQuerterYear(String date) {

		StringBuffer sb = new StringBuffer();

		String year = date.substring(0, 4);

		String month = date.substring(4, 6);

		String querterYear = getQuerteryear(month);

		return sb.append(year).append("/").append(querterYear).toString();
	}

	/**
	 * 오늘 날짜를 넘어온 dateForm에 따라 리턴 시켜줌 ex) getToday("YYYY년 MM월 DD일") ->
	 * "2011년 11월 28일" 리턴
	 * 
	 * @param dateForm
	 * @return
	 */
	public static String getToday(String dateForm) {
		String date = dateForm;
		Calendar cal = getCalendar();
		String year = dayIntToString(cal.get(1));
		String month = dayIntToString(cal.get(2) + 1);
		String day = dayIntToString(cal.get(5));
		date = date.replaceAll("YYYY", year);
		date = date.replaceAll("MM", month);
		date = date.replaceAll("DD", day);
		return date;
	}

	public static String getSysdate(String dateForm) {
		Date date = new Date();
		String sysdate = new SimpleDateFormat(dateForm, Locale.KOREA)
				.format(date);
		return sysdate;
	}

	/**
	 * 입력시 분기와 년도를 계산해서 입력시켜줌
	 * 
	 * @param registerDto
	 */
	public static String getQuerteryear(String month) {

		final Logger logger = LoggerFactory.getLogger(DateUtil.class);

		String querterYear = "";

		if (month.equals("01") || month.equals("02") || month.equals("03")) {
			querterYear = "1";
		} else if (month.equals("04") || month.equals("05")
				|| month.equals("06")) {
			querterYear = "2";
		} else if (month.equals("07") || month.equals("08")
				|| month.equals("09")) {
			querterYear = "3";
		} else if (month.equals("10") || month.equals("11")
				|| month.equals("12")) {
			querterYear = "4";
		} else {
			logger.error("잘못된 월 입력");
		}

		return querterYear;
	}

	/**
	 * 넘어온 date를 dateForm에 맞게 변형 시켜줌( 주의: date는 YYYYMMDD 형식이여야함) ex)
	 * getDayString("20111128","YYYY-MM-DD") -> 2011-11-28 리턴
	 * 
	 * @param date
	 * @param dateForm
	 * @return
	 */
	public static String getDayString(String date, String dateForm) {
		String result = dateForm;
		if (date != null) {
			if (date.length() > 7) {
				String year = date.substring(0, 4);
				String month = date.substring(4, 6);
				String day = date.substring(6, 8);
				result = result.replaceAll("YYYY", year);
				result = result.replaceAll("MM", month);
				result = result.replaceAll("DD", day);
				return result;
			} else {
				return date;
			}
		} else {
			return date;
		}

	}

	/**
	 * 현재 년도를 리턴해줌
	 * 
	 * @return
	 */
	public static int getYear() {
		Calendar cal = getCalendar();
		return cal.get(1);
	}

	/**
	 * <p>
	 * yyyyMMdd 혹은 yyyy-MM-dd 형식의 날짜 문자열을 입력 받아 년, 월, 일을 증감한다. 년, 월, 일은 가감할 수를
	 * 의미하며, 음수를 입력할 경우 감한다.
	 * </p>
	 * 
	 * <pre>
	 * DateUtil.addYearMonthDay("19810828", 0, 0, 19)  = "19810916"
	 * DateUtil.addYearMonthDay("20060228", 0, 0, -10) = "20060218"
	 * DateUtil.addYearMonthDay("20060228", 0, 0, 10)  = "20060310"
	 * DateUtil.addYearMonthDay("20060228", 0, 0, 32)  = "20060401"
	 * DateUtil.addYearMonthDay("20050331", 0, -1, 0)  = "20050228"
	 * DateUtil.addYearMonthDay("20050301", 0, 2, 30)  = "20050531"
	 * DateUtil.addYearMonthDay("20050301", 1, 2, 30)  = "20060531"
	 * DateUtil.addYearMonthDay("20040301", 2, 0, 0)   = "20060301"
	 * DateUtil.addYearMonthDay("20040229", 2, 0, 0)   = "20060228"
	 * DateUtil.addYearMonthDay("20040229", 2, 0, 1)   = "20060301"
	 * </pre>
	 * 
	 * @param dateStr
	 *            날짜 문자열(yyyyMMdd, yyyy-MM-dd의 형식)
	 * @param year
	 *            가감할 년. 0이 입력될 경우 가감이 없다
	 * @param month
	 *            가감할 월. 0이 입력될 경우 가감이 없다
	 * @param day
	 *            가감할 일. 0이 입력될 경우 가감이 없다
	 * @return yyyyMMdd 형식의 날짜 문자열
	 * @throws IllegalArgumentException
	 *             날짜 포맷이 정해진 바와 다를 경우. 입력 값이 <code>null</code>인 경우.
	 */
	public static String addYearMonthDay(String sDate, int year, int month,
			int day) {

		String dateStr = validChkDate(sDate);

		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd",
				Locale.getDefault());
		try {
			cal.setTime(sdf.parse(dateStr));
		} catch (ParseException e) {
			throw new IllegalArgumentException("Invalid date format: "
					+ dateStr);
		}

		if (year != 0)
			cal.add(Calendar.YEAR, year);
		if (month != 0)
			cal.add(Calendar.MONTH, month);
		if (day != 0)
			cal.add(Calendar.DATE, day);

		return sdf.format(cal.getTime());
	}

	/**
	 * 입력된 일자 문자열을 확인하고 8자리로 리턴
	 * 
	 * @param sDate
	 * @return
	 */
	public static String validChkDate(String dateStr) {
		String _dateStr = dateStr;

		if (dateStr == null
				|| !(dateStr.trim().length() == 8 || dateStr.trim().length() == 10)) {
			throw new IllegalArgumentException("Invalid date format: "
					+ dateStr);
		}
		if (dateStr.length() == 10) {
			_dateStr = removeMinusChar(dateStr);
		}
		return _dateStr;
	}

	/**
	 * <p>
	 * String이 비었거나("") 혹은 null 인지 검증한다.
	 * </p>
	 * 
	 * <pre>
	 *  StringUtil.isEmpty(null)      = true
	 *  StringUtil.isEmpty("")        = true
	 *  StringUtil.isEmpty(" ")       = false
	 *  StringUtil.isEmpty("bob")     = false
	 *  StringUtil.isEmpty("  bob  ") = false
	 * </pre>
	 * 
	 * @param str
	 *            - 체크 대상 스트링오브젝트이며 null을 허용함
	 * @return <code>true</code> - 입력받은 String 이 빈 문자열 또는 null인 경우
	 */
	public static boolean isEmpty(String str) {
		return str == null || str.length() == 0;
	}

	/**
	 * <p>
	 * 기준 문자열에 포함된 모든 대상 문자(char)를 제거한다.
	 * </p>
	 * 
	 * <pre>
	 * StringUtil.remove(null, *)       = null
	 * StringUtil.remove("", *)         = ""
	 * StringUtil.remove("queued", 'u') = "qeed"
	 * StringUtil.remove("queued", 'z') = "queued"
	 * </pre>
	 * 
	 * @param str
	 *            입력받는 기준 문자열
	 * @param remove
	 *            입력받는 문자열에서 제거할 대상 문자열
	 * @return 제거대상 문자열이 제거된 입력문자열. 입력문자열이 null인 경우 출력문자열은 null
	 */
	public static String remove(String str, char remove) {
		if (isEmpty(str) || str.indexOf(remove) == -1) {
			return str;
		}
		char[] chars = str.toCharArray();
		int pos = 0;
		for (int i = 0; i < chars.length; i++) {
			if (chars[i] != remove) {
				chars[pos++] = chars[i];
			}
		}
		return new String(chars, 0, pos);
	}

	/**
	 * <p>
	 * 문자열 내부의 마이너스 character(-)를 모두 제거한다.
	 * </p>
	 * 
	 * <pre>
	 * StringUtil.removeMinusChar(null)       = null
	 * StringUtil.removeMinusChar("")         = ""
	 * StringUtil.removeMinusChar("a-sdfg-qweqe") = "asdfgqweqe"
	 * </pre>
	 * 
	 * @param str
	 *            입력받는 기준 문자열
	 * @return " - "가 제거된 입력문자열 입력문자열이 null인 경우 출력문자열은 null
	 */
	public static String removeMinusChar(String str) {
		return remove(str, '-');
	}

	public static int getDaysBetween(String startDate, String endDate) {
		int daysBetween = 0;

		try {
			long interval = 0L;
			if (startDate != null && startDate.length() == 8 && endDate != null
					&& endDate.length() == 8) {
				SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
				ParsePosition strPos = new ParsePosition(0);
				ParsePosition endPos = new ParsePosition(0);

				Date startDateOb = format.parse(startDate, strPos);
				Date endDateOb = format.parse(endDate, endPos);

				interval = endDateOb.getTime() - startDateOb.getTime();
			}
			daysBetween = new Long(interval / (1L * 24 * 60 * 60 * 1000))
					.intValue();
		} catch (Exception e) {

		}

		return daysBetween;
	}
	
	public static long diffOfDate(String begin, String end) throws Exception
	  {
	    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
	 
	    Date beginDate = formatter.parse(begin);
	    Date endDate = formatter.parse(end);
	 
	    long diff = endDate.getTime() - beginDate.getTime();
	    long diffDays = diff / (24 * 60 * 60 * 1000);
	 
	    return diffDays;
	  }
}
