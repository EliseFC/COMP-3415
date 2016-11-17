package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class NewRoom extends Packet {

	public NewRoom() {
		super(5);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		String roomNumber = verifyParameter("roomNumber", parameters);
		int buildingID = vInt("buildingID", parameters);
		String devices = verifyParameter("devices", parameters);
		int capacity = vInt("capacity", parameters);
		
		SQL.query("INSERT INTO rooms (roomNumber, devices, bldng, capacity) VALUES (?, ?, ?, ?)", conn).setString(1, roomNumber).setString(2, devices).setInt(3, buildingID).setInt(4, capacity).execute();
	}
}
