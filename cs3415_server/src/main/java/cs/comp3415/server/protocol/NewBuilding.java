package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

public class NewBuilding extends Packet {

	public NewBuilding() {
		super(2);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		String name = verifyParameter("name", parameters);
		String type = verifyParameter("type", parameters);
		String facilities = verifyParameter("facilities", parameters);
		
		// see if there is a building existing
		PreparedStatement ps = conn.prepareStatement("SELECT * FROM buildings WHERE name = ?");
		ps.setString(1, name);
		ResultSet rs = ps.executeQuery();
		
		// verify that the query got no result
		if(rs.isBeforeFirst())
			throw new RuntimeException("Building already exists " + name);
		
		rs.close();
		ps.close();
		ps = conn.prepareStatement("INSERT INTO buildings (name, facilities, type) VALUES (?, ?, ?)");
		ps.setString(1, name);
		ps.setString(2, facilities);
		ps.setString(3, type);
		ps.execute();
		ps.close();
		rs.close();
	}

}
