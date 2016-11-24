package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class UpdateUser extends Packet {

	public UpdateUser() {
		super(27);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		String email = vString("email", parameters);
		String fName = vString("fName", parameters);
		String lName = vString("lName", parameters);
		int year = vInt("year", parameters);
		int sNo = vInt("sNo", parameters);
		
		SQL.query("SELECT * FROM users WHERE email = ?", conn).closeConnection(false).setString(1, email).executeQuery().checkForNone("No user with that email found.");
		SQL.query("UPDATE users SET first_name = ?, last_name = ?, student_number = ?, year = ? WHERE email = ?", conn)
			.setString(1, fName).setString(2, lName)
			.setInt(3, sNo).setInt(4, year).setString(5, email).execute();
	}
}
