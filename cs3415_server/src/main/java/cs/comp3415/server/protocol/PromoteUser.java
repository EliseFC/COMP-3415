package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class PromoteUser extends Packet {

	public PromoteUser() {
		super(25);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int id = vInt("userID", parameters);
		
		SQL.query("SELECT * FROM users WHERE id = ? AND accType = 'manager'", conn).setInt(1, id).closeConnection(false).executeQuery().checkForAny("User is already a manager.");
		SQL.query("UPDATE users SET accType = 'manager' WHERE id = ?", conn).setInt(1, id).execute();
	}
}
