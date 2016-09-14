package cs.comp3415.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.framing.Framedata;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class Server extends WebSocketServer {

	private static final int PORT = 8887;
	
	public Server(int port) {
		super(new InetSocketAddress (port));
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		System.out.println(conn + " closed the connection.");
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		ex.printStackTrace();
		System.out.println(conn + " had a fatal exception.");
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		System.out.println("message received: " + message);
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		System.out.println(conn + " connected!");
	}
	
	@Override
	public void onWebsocketMessageFragment(WebSocket conn, Framedata fragment) {
		System.out.println("fragment received: " + fragment);
	}
	
	public static void main(String[] args) throws InterruptedException, IOException {
		WebSocketImpl.DEBUG = true;
		Server s = new Server(PORT);
		s.start();
		System.out.println("Server started on port: " + s.getPort());

		BufferedReader sysin = new BufferedReader(new InputStreamReader(System.in));
		while(true) {
			String in = sysin.readLine();
			if(in.equalsIgnoreCase("exit")) {
				s.stop();
				break;
			}
		}
	}

}
