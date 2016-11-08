package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

public class RemoveBuilding extends Packet {

	public RemoveBuilding() {
		super(3);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		int buildingId = Integer.parseInt(verifyParameter("buildingID", parameters));
		
		// see if there is a building existing
		PreparedStatement ps = conn.prepareStatement("SELECT * FROM buildings WHERE buildingID = ?");
		ps.setInt(1, buildingId);
		ResultSet rs = ps.executeQuery();
		
		// verify that the query got no result
		if(!rs.isBeforeFirst())
			throw new RuntimeException("Building does not exist " + buildingId);
		
		rs.close();
		ps.close();
		ps = conn.prepareStatement("DELETE FROM buildings WHERE buildingID = ?");
		ps.setInt(1, buildingId);
		ps.execute();
		ps.close();
		rs.close();
	}
}
