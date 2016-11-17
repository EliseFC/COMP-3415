package cs.comp3415.server.protocol;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import cs.comp3415.server.util.SQL;

public class GetHousingRequests extends Packet {

	private List<HousingRequest> requests;
	
	public GetHousingRequests() {
		super(19);
	}
	
	@Override
	public void process(Connection conn, Map<String, List<String>> parameters) throws Exception {
		requests = SQL.query("SELECT id, request, request_building FROM users WHERE request IS NOT NULL AND request_building != 0", conn).executeQuery().fillList(HousingRequest.class, rs -> { return new HousingRequest(rs.getInt(1), rs.getString(2), rs.getInt(3)); });
	}
	
	public static class HousingRequest {
		private int student_id;
		private String request;
		private int building_id;
		public HousingRequest(int sid, String req, int bid) {
			this.student_id = sid;
			this.request = req;
			this.building_id = bid;
		}
	}
}
