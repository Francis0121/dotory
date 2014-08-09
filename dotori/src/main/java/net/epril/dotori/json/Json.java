package net.epril.dotori.json;

/**
 * Javscript에 데이터 전달을 위한 클래스
 * 
 * @author Francis
 * @version v0.1
 * @since 14.08.08
 */
public class Json {

	private Integer code;

	private String log;

	private Object data;

	public Json() {
		super();
	}

	public Json(Integer code, String log) {
		super();
		this.code = code;
		this.log = log;
	}

	public Json(Integer code, String log, Object data) {
		super();
		this.code = code;
		this.log = log;
		this.data = data;
	}

	public Integer getCode() {
		return code;
	}

	public String getLog() {
		return log;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public void setLog(String log) {
		this.log = log;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Json [code=" + code + ", log=" + log + ", data=" + data + "]";
	}
}
