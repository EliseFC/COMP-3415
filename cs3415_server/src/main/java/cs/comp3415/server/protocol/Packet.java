package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

public abstract class Packet {

	private boolean success = true;
	private int id;
	
	public abstract void process(Connection conn, Map<String, List<String>> parameters) throws Exception;
	
	public Packet(int id) {
		this.id = id;
	}
	
	public int getId() {
		return id;
	}
	
	protected String getParameter(List<String> parameter) {
		StringBuilder sb = new StringBuilder();
		parameter.forEach(s -> sb.append(s));
		return sb.toString();
	}
	
	protected String verifyParameter(String key, Map<String, List<String>> parameters) throws RuntimeException {
		if(parameters.get(key) == null)
			throw new RuntimeException(key + " parameter does not exist");
		
		String parameter = getParameter(parameters.get(key));
		
		if(parameter.equals(""))
			throw new RuntimeException(key + " parameter does not exist");
		
		return parameter;
	}
	
	protected String vString(String key, Map<String, List<String>> parameters) {
		return verifyParameter(key, parameters);
	}
	
	protected int vInt(String key, Map<String, List<String>> parameters) {
		return Integer.parseInt(verifyParameter(key, parameters));
	}
}
