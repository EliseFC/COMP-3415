package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class RemoveIssue extends Packet {
	
	public RemoveIssue() {
		super(14);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int issueID = vInt("issueID", parameters);
		
		SQL.query("DELETE FROM issues WHERE issue_id = ?", conn).setInt(1, issueID).execute();
	}

}
