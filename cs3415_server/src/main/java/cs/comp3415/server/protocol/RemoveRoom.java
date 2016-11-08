package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

public class RemoveRoom extends Packet {

	public RemoveRoom() {
		super(6);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		int roomId = Integer.parseInt(verifyParameter("roomID", parameters));
		
		// see if there is a building existing
		PreparedStatement ps = conn.prepareStatement("SELECT * FROM rooms WHERE room_id = ?");
		ps.setInt(1, roomId);
		ResultSet rs = ps.executeQuery();
		
		// verify that the query got no result
		if(!rs.isBeforeFirst())
			throw new RuntimeException("Room does not exist " + roomId);
		
		rs.close();
		ps.close();
		ps = conn.prepareStatement("DELETE FROM rooms WHERE room_id = ?");
		ps.setInt(1, roomId);
		ps.execute();
		ps.close();
		rs.close();
	}
}
