package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.protocol.GetUser.User;
import cs.comp3415.server.util.SQL;

public class GetUsers extends Packet {
	
	private List<User> users;
	
	public GetUsers() {
		super(24);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		users = SQL.query("SELECT id, first_name, last_name, student_number, email, password, year, accType, request, request_building FROM users", conn)
				.executeQuery()
				.fillList(User.class, rs -> {
					return new User(rs.getString(2), rs.getString(3), rs.getInt(1), rs.getInt(4), rs.getInt(7), rs.getString(5), rs.getString(6), rs.getString(9), rs.getString(8), rs.getString(10));
				});
	}

}
