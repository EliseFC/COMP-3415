package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class GetOccupants extends Packet {
	
	private List<Occupant> occupants;
	
	public GetOccupants() {
		super(7);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameter
		int roomId = Integer.parseInt(verifyParameter("roomID", parameters));
		
		// get occupants
		PreparedStatement ps = conn.prepareStatement("SELECT student, start_date, end_date FROM occupants WHERE room_id = ?");
		ps.setInt(1, roomId);
		ResultSet rs = ps.executeQuery();
		fill(rs);
		rs.close();
		ps.close();
	}
	
	private void fill(ResultSet rs) throws SQLException {
		occupants = new LinkedList<>();
		while(rs.next())
			occupants.add(new Occupant(rs.getString(1), rs.getString(2), rs.getString(3)));
	}
	
	public static class Occupant {
		private String student;
		private String start_date;
		private String end_date;
		public Occupant(String student, String start_date, String end_date) {
			this.start_date = start_date;
			this.student = student;
			this.end_date = end_date;
		}
	}

}
