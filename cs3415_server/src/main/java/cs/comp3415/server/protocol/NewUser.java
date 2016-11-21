package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class NewUser extends Packet {

	private int userID;
	
	public NewUser() {
		super(22);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		String fName = vString("fName", parameters);
		String lName = vString("lName", parameters);
		int sNo = vInt("sNo", parameters);
		int year = vInt("year", parameters);
		String email = vString("email", parameters);
		String password = vString("password", parameters);
		
		SQL.query("SELECT * FROM users WHERE email = ?", conn).setString(1, email).closeConnection(false).executeQuery().checkForAny("Student is already registered!");
		SQL.query("INSERT INTO users (first_name, last_name, password, student_number, year, email) VALUES (?, ?, ?, ?, ?, ?)", conn)
			.setString(1, fName).setString(2, lName)
			.setString(3, password).setInt(4, sNo)
			.setInt(5, year).setString(6, email).closeConnection(false).execute();
		userID = SQL.query("SELECT id FROM users WHERE email = ?", conn).setString(1, email).executeQuery().fillOne(int.class, rs -> rs.getInt(1), "SQL error creating user.");
	}
}
