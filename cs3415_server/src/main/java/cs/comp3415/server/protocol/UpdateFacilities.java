package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class UpdateFacilities extends Packet {

	public UpdateFacilities() {
		super(10);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify
		int buildingID = vInt("buildingID", parameters);
		String facilities = vString("facilities", parameters);
		
		SQL.query("UPDATE buildings SET facilities = ? WHERE buildingID = ?", conn).setString(1, facilities).setInt(2, buildingID).execute();
	}
}
