package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class GetBuildings extends Packet {

	private List<Building> buildings;
	
	public GetBuildings() {
		super(1);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws SQLException {
		buildings = SQL.query("SELECT buildingID, name, type FROM buildings", conn).executeQuery().fillList(Building.class, rs -> { return new Building(rs.getInt(1), rs.getString(2), rs.getString(3)); });
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
