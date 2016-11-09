package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class RemoveBuilding extends Packet {

	public RemoveBuilding() {
		super(3);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		int buildingId = vInt("buildingID", parameters);
		
		SQL.query("SELECT * FROM buildings WHERE buildingID = ?", conn).closeConnection(false).setInt(1, buildingId).executeQuery().checkForNone("Building does not exist.");
		SQL.query("DELETE FROM buildings WHERE buildingID = ?", conn).setInt(1, buildingId).execute();
	}
}
