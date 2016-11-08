package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class GetRooms extends Packet {

	private List<Room> rooms;
	
	public GetRooms() {
		super(4);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws SQLException {
		// verify parameter
		int building = Integer.parseInt(verifyParameter("buildingID", parameters));
		
		// try the query
		PreparedStatement ps = conn.prepareStatement("SELECT room_id, roomNumber, devices FROM rooms WHERE bldng = ?");
		ps.setInt(1, building);
		ResultSet rs = ps.executeQuery();
		fill(rs);
		rs.close();
		ps.close();
	}
	
	private void fill(ResultSet rs) throws SQLException {
		rooms = new LinkedList<>();
		while(rs.next())
			rooms.add(new Room(rs.getInt(1), rs.getString(2), rs.getString(3)));
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
