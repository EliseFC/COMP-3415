package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class RemoveRoom extends Packet {

	public RemoveRoom() {
		super(6);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		int roomId = vInt("roomID", parameters);
		
		SQL.query("SELECT * FROM rooms WHERE room_id = ?", conn).closeConnection(false).setInt(1, roomId).executeQuery().checkForNone("Room does not exist.");
		SQL.query("DELETE FROM rooms WHERE room_id = ?", conn).setInt(1, roomId).execute();
	}
}
