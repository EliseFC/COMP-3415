package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class SetIssueStatus extends Packet {
	
	public SetIssueStatus() {
		super(13);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int issueID = vInt("issueID", parameters);
		String status = vString("status", parameters);
		
		SQL.query("UPDATE issues SET status = ? WHERE issue_id = ?", conn).setString(1, status).setInt(2, issueID).execute();
	}

}
