package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class DenyRequest extends Packet {

	public DenyRequest() {
		super(21);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int studentID = vInt("studentID", parameters);
		
		SQL.query("SELECT * FROM users WHERE id = ?", conn).closeConnection(false).setInt(1, studentID).executeQuery().checkForNone("That student doesn't exist!");
		SQL.query("UPDATE users SET request = NULL, request_building = 0 WHERE id = ?", conn).setInt(1, studentID).execute();
	}
}
