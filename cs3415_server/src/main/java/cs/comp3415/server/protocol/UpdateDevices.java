package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class UpdateDevices extends Packet {
	
	public UpdateDevices() {
		super(9);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify
		int roomID = vInt("roomID", parameters);
		String devices = vString("devices", parameters);
		
		SQL.query("UPDATE rooms SET devices = ? WHERE room_id = ?", conn).setString(1, devices).setInt(2, roomID).execute();
	}

}
