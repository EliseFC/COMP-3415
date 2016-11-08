package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class GetIssues extends Packet {

	private List<Issue> issues;
	
	public GetIssues() {
		super(8);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int bldngId = Integer.parseInt(verifyParameter("buildingID", parameters));
		
		// get issues
		PreparedStatement ps = conn.prepareStatement("SELECT building_id, issue, status FROM issues WHERE building_id = ?");
		ps.setInt(1, bldngId);
		ResultSet rs = ps.executeQuery();
		fill(rs);
		rs.close();
		ps.close();
	}
	
	private void fill(ResultSet rs) throws SQLException {
		issues = new LinkedList<>();
		while(rs.next())
			issues.add(new Issue(rs.getInt(1), rs.getString(2), rs.getString(3)));
	}
	
	public static class Issue {
		private int buildingID;
		private String issue;
		private String status;
		public Issue(int id, String issue, String status) {
			this.buildingID = id;
			this.issue = issue;
			this.status = status;
		}
	}

}
