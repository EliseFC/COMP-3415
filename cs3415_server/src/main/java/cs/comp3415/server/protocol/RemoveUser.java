package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class RemoveUser extends Packet {

	public RemoveUser() {
		super(26);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int id = vInt("userID", parameters);
		
		SQL.query("SELECT * FROM users WHERE id = ?", conn).setInt(1, id).closeConnection(false).executeQuery().checkForNone("User does not exist.");
		SQL.query("DELETE FROM users WHERE id = ?", conn).setInt(1, id).execute();
	}
}
