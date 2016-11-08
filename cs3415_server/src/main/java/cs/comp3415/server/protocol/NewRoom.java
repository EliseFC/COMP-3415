package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

public class NewRoom extends Packet {

	public NewRoom() {
		super(5);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		String roomNumber = verifyParameter("roomNumber", parameters);
		int buildingID = Integer.parseInt(verifyParameter("buildingID", parameters));
		String devices = verifyParameter("devices", parameters);

		PreparedStatement ps = conn.prepareStatement("INSERT INTO rooms (roomNumber, devices, bldng) VALUES (?, ?, ?)");
		ps.setString(1, roomNumber);
		ps.setString(2, devices);
		ps.setInt(3, buildingID);
		ps.execute();
		ps.close();
	}
}
