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
		issues = SQL.query("SELECT issue_id, user_id, issue, status FROM issues WHERE building_id = ?", conn).setInt(1, bldngId).executeQuery().fillList(Issue.class, rs -> { return new Issue(rs.getInt(1), rs.getInt(2), rs.getString(3), rs.getString(4)); });
	}
	
	public static class Issue {
		private int issue_id;
		private int student_id;
		private String issue;
		private String status;
		public Issue(int iId, int sId, String issue, String status) {
			this.issue = issue;
			this.status = status;
			this.issue_id = iId;
			this.student_id = sId;
		}
	}

}
