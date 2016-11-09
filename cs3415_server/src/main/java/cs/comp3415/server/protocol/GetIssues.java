package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class GetIssues extends Packet {

	private List<Issue> issues;
	
	public GetIssues() {
		super(8);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int bldngId = vInt("buildingID", parameters);
		SQL.query("SELECT issue, status FROM issues WHERE building_id = ?", conn).setInt(1, bldngId).executeQuery().fillList(Issue.class, rs -> { return new Issue(rs.getString(1), rs.getString(2)); });
	}
	
	public static class Issue {
		private String issue;
		private String status;
		public Issue(String issue, String status) {
			this.issue = issue;
			this.status = status;
		}
	}

}
