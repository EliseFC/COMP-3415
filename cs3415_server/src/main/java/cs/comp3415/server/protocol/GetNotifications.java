package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class GetNotifications extends Packet {
	
	private List<Notification> notifications;
	
	public GetNotifications() {
		super(15);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		int bldg = vInt("buildingID", parameters);
		
		notifications = SQL.query("SELECT notifi_id, notification FROM notifications WHERE building = ?", conn).setInt(1, bldg).executeQuery().fillList(Notification.class, rs -> { return new Notification(rs.getInt(1), rs.getString(2)); });
	}
	
	public static class Notification {
		private int notification_id;
		private String notification;
		public Notification(int id, String not) {
			this.notification_id = id;
			this.notification = not;
		}
	}

}
