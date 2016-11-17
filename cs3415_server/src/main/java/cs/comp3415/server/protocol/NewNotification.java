package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class NewNotification extends Packet {

	public NewNotification() {
		super(16);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int bldg = vInt("buildingID", parameters);
		String notif = vString("notification", parameters);
		
		SQL.query("INSERT INTO notifications (building, notification) VALUES (?, ?)", conn).setInt(1, bldg).setString(2, notif).execute();
	}
}
