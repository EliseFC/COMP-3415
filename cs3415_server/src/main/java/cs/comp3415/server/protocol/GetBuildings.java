package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class GetBuildings extends Packet {

	private boolean success = true;
	private List<Building> buildings;
	
	public GetBuildings() {
		super(1);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws SQLException {
		// try the query
		ResultSet rs = conn.prepareStatement("SELECT buildingID, name, type FROM buildings").executeQuery();
		fill(rs);
		conn.close();
		rs.close();
	}
	
	private void fill(ResultSet rs) throws SQLException {
		buildings = new LinkedList<>();
		while(rs.next())
			buildings.add(new Building(rs.getInt(1), rs.getString(2), rs.getString(3)));
		
	}
	
	public static class Building {
		private int id;
		private String name;
		private String type;
		
		public Building(int id, String name, String type) {
			this.id = id;
			this.name = name;
			this.type = type;
		}
	}
}
