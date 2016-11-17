package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class NewIssue extends Packet {

	public NewIssue() {
		super(12);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int buildingId = vInt("buildingID", parameters);
		int userId = vInt("userID", parameters);
		String issue = vString("issue", parameters);
		
		SQL.query("INSERT INTO issues (user_id, building_id, issue) VALUES (?, ?, ?)", conn).setInt(1, userId).setInt(2, buildingId).setString(3, issue).execute();
	}

}
