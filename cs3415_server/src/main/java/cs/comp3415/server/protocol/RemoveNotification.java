package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class RemoveNotification extends Packet {
	
	public RemoveNotification() {
		super(17);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int notifID = vInt("notificationID", parameters);
		
		SQL.query("DELETE FROM notifications WHERE notifi_id = ?", conn).setInt(1, notifID).execute();
	}

}
