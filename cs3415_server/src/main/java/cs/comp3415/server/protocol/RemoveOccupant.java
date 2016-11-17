package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class RemoveOccupant extends Packet {
	
	public RemoveOccupant() {
		super(11);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int studentID = vInt("studentID", parameters);
		
		SQL.query("DELETE FROM occupants WHERE studentID = ?", conn).setInt(1, studentID).execute();
	}
}
