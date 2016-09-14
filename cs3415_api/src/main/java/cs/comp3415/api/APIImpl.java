package cs.comp3415.api;

import java.net.URI;
import java.net.URISyntaxException;

import org.java_websocket.WebSocket;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.framing.Framedata;
import org.java_websocket.handshake.ServerHandshake;

import com.google.gson.Gson;

public class APIImpl extends WebSocketClient {

	public APIImpl(String serverLoc) throws URISyntaxException {
		super(new URI(serverLoc));
	}

	@Override
	public void onClose(int code, String reason, boolean remote) {
		System.out.println("Closing connection to the server.");
	}

	@Override
	public void onError(Exception ex) {
		ex.printStackTrace();
		System.out.println("Error trying to connect to the server!");
	}

	@Override
	public void onMessage(String message) {
		System.out.println("received message: " + message);
	}

	@Override
	public void onOpen(ServerHandshake handshake) {
		System.out.println("Connected to server.");
	}
	
	@Override
	public void onWebsocketMessageFragment(WebSocket conn, Framedata fragment) {
		System.out.println("fragment received: " + fragment);
	}

	public static void main(String[] args) throws URISyntaxException, InterruptedException {
		APIImpl c = new APIImpl("ws://158.69.208.150:8887");
		c.connect();
		Thread.sleep(1000);
		Gson gson = new Gson();
		c.send(gson.toJson(new FakeJSONObject()));
		c.close();
	}
	
	public static class FakeJSONObject {
		private String sentence = "hello world here are some numbers";
		private int nums[] = new int[]{7,7,3,2};
	}
}
