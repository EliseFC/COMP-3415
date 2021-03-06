package cs.comp3415.server;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;

import com.google.gson.Gson;

import cs.comp3415.server.protocol.Packet;
import cs.comp3415.server.protocol.ProtocolManager;
import fi.iki.elonen.NanoHTTPD;

public class Server extends NanoHTTPD {

	private static final int PORT = 8887;
	
	private DB db;
	private ProtocolManager protocolManager;
	private Configuration config;
	
	public Server(DB db, ProtocolManager pm, Configuration config) {
		super(PORT);
		this.db = db;
		this.protocolManager = pm;
		this.config = config;
	}
	
	@Override
	public Response serve(IHTTPSession session) {
		try {
			session.parseBody(new HashMap<String, String>());
		} catch (IOException | ResponseException e) {
			e.printStackTrace();
		}
		
		Packet packet = protocolManager.getPacketFromID(session.getParameters());
		
		if(packet == null)
			return sendErrorPacket("No packet with id " + session.getParameters().get("id") + " found!");
		
		Connection conn = db.getConnection();
		try {
			System.out.println("Processing a packet with ID " + packet.getId());
			packet.process(conn, session.getParameters());
		} catch(Exception e) {
			e.printStackTrace();
			return sendErrorPacket(e.getMessage());
		} finally {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		Response r = newFixedLengthResponse(new Gson().toJson(packet));
		r.addHeader("Access-Control-Allow-Origin", "*");
		r.addHeader("Content-Type", "application/json");
		return r;
	}
	
	private Response sendErrorPacket(String errorMsg) {
		Response r = newFixedLengthResponse("{\"success\":false, \"error_message\":\"" + errorMsg + "\"}");
		r.addHeader("Access-Control-Allow-Origin", "*");
		r.addHeader("Content-Type", "application/json");
		return r;
	}
	
	public DB getDB() {
		return db;
	}
	
	public Configuration getConfiguration() {
		return config;
	}
	
	public ProtocolManager getProtocol() {
		return protocolManager;
	}
	
	public static void main(String args[]) throws IOException {
		// load the configuration
		Configuration config = new Gson().fromJson(new FileReader("config.json"), Configuration.class);
		
		// load the DB
		DB db = new DB(config);
		
		// load the protocol
		ProtocolManager pm = new ProtocolManager();
		
		// load the server
		Server s = new Server(db, pm, config);
		s.start();
		System.out.println("Server started on port: " + PORT);
		
		BufferedReader sysin = new BufferedReader(new InputStreamReader(System.in));
		while(true) {
			String in = sysin.readLine();
			if(in.equalsIgnoreCase("exit")) {
				s.stop();
				db.shutdown();
				break;
			}
		}
	}

}
