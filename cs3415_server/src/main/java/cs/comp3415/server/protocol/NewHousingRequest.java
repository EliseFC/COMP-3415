package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class NewHousingRequest extends Packet {
	
	public NewHousingRequest() {
		super(18);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int studentID = vInt("studentID", parameters);
		String request = vString("request", parameters);
		int buildingID = vInt("buildingID", parameters);
		
		SQL.query("SELECT * FROM users WHERE id = ?", conn).closeConnection(false).setInt(1, studentID).executeQuery().checkForNone("That student doesn't exist!");
		SQL.query("UPDATE users SET request = ?, request_building = ? WHERE id = ?", conn).setString(1, request).setInt(2, buildingID).setInt(3, studentID).execute();
	}

}
