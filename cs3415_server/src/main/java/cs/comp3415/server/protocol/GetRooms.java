package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class GetRooms extends Packet {

	private List<Room> rooms;
	
	public GetRooms() {
		super(4);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws SQLException {
		// verify parameter
		int building = vInt("buildingID", parameters);
		
		// try the query
		rooms = SQL.query("SELECT room_id, roomNumber, devices FROM rooms WHERE bldng = ?", conn).setInt(1, building).executeQuery().fillList(Room.class, rs -> { return new Room(rs.getInt(1), rs.getString(2), rs.getString(3)); });
	}
	
	public static class Room {
		private int id;
		private String number;
		private String devices;
		
		public Room(int id, String number, String devices) {
			this.id = id;
			this.number = number;
			this.devices = devices;
		}
	}
}
