package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class GetOccupants extends Packet {
	
	private List<Occupant> occupants;
	
	public GetOccupants() {
		super(7);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int roomId = vInt("roomID", parameters);
		occupants = SQL.query("SELECT studentID, student, start_date, end_date FROM occupants WHERE room_id = ?", conn).setInt(1, roomId).executeQuery().fillList(Occupant.class, rs -> { return new Occupant(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4)); });
	}
	
	public static class Occupant {
		private int student_id;
		private String student;
		private String start_date;
		private String end_date;
		public Occupant(int student_id, String student, String start_date, String end_date) {
			this.start_date = start_date;
			this.student = student;
			this.end_date = end_date;
			this.student_id = student_id;
		}
	}

}
