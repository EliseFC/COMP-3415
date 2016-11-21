package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class GetUser extends Packet {
	
	private User user;
	
	public GetUser() {
		super(23);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int id = vInt("userID", parameters);
		String email = vString("email", parameters);
		
		if(id == -1) {
			// get based on email
			user = SQL.query("SELECT id, first_name, last_name, student_number, email, password, year, accType, request, request_building FROM users WHERE email = ?", conn)
					.setString(1, email)
					.executeQuery()
					.fillOne(User.class, rs -> {
						return new User(rs.getString(2), rs.getString(3), rs.getInt(1), rs.getInt(4), rs.getInt(7), rs.getString(5), rs.getString(6), rs.getString(9), rs.getString(8), rs.getString(10));
					}, "No user with that email found.");
		} else {
			// get based on id
			user = SQL.query("SELECT id, first_name, last_name, student_number, email, password, year, accType, request, request_building FROM users WHERE id = ?", conn)
					.setInt(1, id)
					.executeQuery()
					.fillOne(User.class, rs -> {
						return new User(rs.getString(2), rs.getString(3), rs.getInt(1), rs.getInt(4), rs.getInt(7), rs.getString(5), rs.getString(6), rs.getString(9), rs.getString(8), rs.getString(10));
					}, "No user with that id found.");
		}
	}

	public static class User {
		private String first_name;
		private String last_name;
		private int user_id;
		private int student_number;
		private int year;
		private String email;
		private String password;
		private String account_type;
		private String request;
		private String request_building;
		public User(String f, String l, int id, int no, int y, String e, String p, String r, String t, String rb) {
			this.first_name = f;
			this.last_name = l;
			this.user_id = id;
			this.student_number = no;
			this.year = y;
			this.email = e;
			this.password = p;
			this.request = r;
			this.request_building = rb;
			this.account_type = t;
		}
	}
}
