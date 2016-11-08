package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class GetUserInfo extends Packet {

	private boolean success = true;
	private int userId;
	private String password;
	private String userType;
	private String name;
	
	public GetUserInfo() {
		super(0);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws SQLException {
		// verify parameters
		String username = verifyParameter("username", parameters);
		
		// try the query
		PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE name = ?");
		ps.setString(1, username);
		ResultSet rs = ps.executeQuery();
		
		// verify that the query got a result
		if(!rs.isBeforeFirst())
			throw new RuntimeException("No user found with the username " + username);
		
		rs.next();
		fill(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4));
		conn.close();
		rs.close();
	}
	
	private void fill(int id, String password, String userType, String name) {
		this.userId = id;
		this.password = password;
		this.userType = userType;
		this.name = name;
	}
}
