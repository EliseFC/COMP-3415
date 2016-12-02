package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.Date;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class ApproveRequest extends Packet {

	public ApproveRequest() {
		super(20);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int studentID = vInt("studentID", parameters);
		int roomID = vInt("roomID", parameters);
		
		SQL.query("SELECT * FROM users WHERE id = ?", conn).closeConnection(false).setInt(1, studentID)
			.executeQuery().checkForNone("That student doesn't exist!");
		
		String studentName = SQL.query("SELECT email FROM users WHERE id = ?", conn).closeConnection(false)
				.setInt(1, studentID).executeQuery().fillOne(String.class, rs -> rs.getString(1), "Student doesn't exist!");
		
		SQL.query("UPDATE users SET request = NULL, request_building = 0 WHERE id = ?", conn)
			.closeConnection(false).setInt(1, studentID).execute();
		
		SQL.query("INSERT INTO occupants (studentID, room_id, student, start_date) VALUES (?, ?, ?, ?)", conn)
			.setInt(1, studentID)
			.setInt(2, roomID)
			.setString(3, studentName)
			.setString(4, new Date(System.currentTimeMillis()).toString())
			.execute();
	}
}
