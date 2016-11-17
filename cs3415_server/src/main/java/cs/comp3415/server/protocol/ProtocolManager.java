package cs.comp3415.server.protocol;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;

public class ProtocolManager {
	private Map<Integer, Supplier<Packet>> packets = new HashMap<>();
	
	public ProtocolManager() {
		packets.put(0, GetUserInfo::new);
		packets.put(1, GetBuildings::new);
		packets.put(2, NewBuilding::new);
		packets.put(3, RemoveBuilding::new);
		packets.put(4, GetRooms::new);
		packets.put(5, NewRoom::new);
		packets.put(6, RemoveRoom::new);
		packets.put(7, GetOccupants::new);
		packets.put(8, GetIssues::new);
		packets.put(9, UpdateDevices::new);
		packets.put(10, UpdateFacilities::new);
		packets.put(11, RemoveOccupant::new);
	}
	
	public Packet getPacketFromID(int id) {
		return packets.get(id).get();
	}
	
	public Packet getPacketFromID(Map<String, List<String>> parameters) {
		if(parameters.get("id") == null)
			return null;
		
		StringBuilder sb = new StringBuilder();
		parameters.get("id").forEach(s -> sb.append(s));
		
		int id;
		try {
			id = Integer.parseInt(sb.toString());
		} catch(Exception e) {
			return null;
		}
		
		if(packets.get(id) == null)
			return null;
		
		return packets.get(id).get();
	}
}
