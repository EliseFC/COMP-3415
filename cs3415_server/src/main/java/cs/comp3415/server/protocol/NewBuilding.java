package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class NewBuilding extends Packet {

	public NewBuilding() {
		super(2);
	}

	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		// verify parameters
		String name = verifyParameter("name", parameters);
		String type = verifyParameter("type", parameters);
		String facilities = verifyParameter("facilities", parameters);
		
		SQL.query("SELECT * FROM buildings WHERE name = ?", conn).closeConnection(false).setString(1, name).executeQuery().checkForAny("Building already exists.");
		SQL.query("INSERT INTO buildings (name, facilities, type) VALUES (?, ?, ?)", conn).setString(1, name).setString(2, facilities).setString(3, type).execute();
	}

}
