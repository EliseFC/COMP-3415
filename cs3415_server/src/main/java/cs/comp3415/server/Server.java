package cs.comp3415.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.framing.Framedata;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.google.gson.Gson;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpServer;

import fi.iki.elonen.NanoHTTPD;

public class Server /*extends WebSocketServer*/ extends NanoHTTPD {

	private static final int PORT = 8887;
	
	public Server() {
		super(PORT);
	}
	
	@Override
	public Response serve(IHTTPSession session) {
		return newFixedLengthResponse(new Gson().toJson(session.getParameters()));
	}
	
	public static void main(String args[]) throws IOException {
		Server s = new Server();
		s.start();
		System.out.println("Server started on port: " + PORT);
		
		BufferedReader sysin = new BufferedReader(new InputStreamReader(System.in));
		while(true) {
			String in = sysin.readLine();
			if(in.equalsIgnoreCase("exit")) {
				s.stop();
				break;
			}
		}
	}

	/*public static void main(String args[]) throws IOException {
		HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 1);
		server.createContext("/comp3415", handler -> {
			Headers headers = handler.getResponseHeaders();
			if(handler.getRequestMethod().equalsIgnoreCase("GET")) {
				// proper get request
				Map<String, List<String>> requestParams = getRequestParameters(handler.getRequestURI());
				String gson = new Gson().toJson(requestParams);
				byte raw[] = gson.getBytes(Charset.defaultCharset());
				
				headers.set("Content-Type", "application/json; charset=" + Charset.defaultCharset());
				handler.sendResponseHeaders(200, raw.length);
				handler.getResponseBody().write(raw);
			} else {
				// idk just throw an error
				headers.set("Allow", "GET");
				handler.sendResponseHeaders(405, -1);
			}
		});
		server.start();
		System.out.println("Server started on port: " + PORT);

		BufferedReader sysin = new BufferedReader(new InputStreamReader(System.in));
		while(true) {
			String in = sysin.readLine();
			if(in.equalsIgnoreCase("exit")) {
				server.stop(1);
				break;
			}
		}
	}*/
	
	/*
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
	}*/
	
	private static Map<String, List<String>> getRequestParameters(URI requestUri) {
		Map<String, List<String>> requestParameters = new LinkedHashMap<>();
		String requestQuery = requestUri.getRawQuery();
		if(requestQuery != null) {
			String[] rawRequestParameters = requestQuery.split("[&;]", -1);
			for(String rawRequestParameter : rawRequestParameters) {
				String[] requestParameter = rawRequestParameter.split("=", 2);
				String requestParameterName = decodeUrlComponent(requestParameter[0]);
				requestParameters.putIfAbsent(requestParameterName, new ArrayList<>());
				String requestParameterValue = requestParameter.length > 1 ? decodeUrlComponent(requestParameter[1]) : null;
				requestParameters.get(requestParameterName).add(requestParameterValue);
			}
		}
		return requestParameters;
	}
	
	private static String decodeUrlComponent(String urlComponent) {
		try {
			return URLDecoder.decode(urlComponent, Charset.defaultCharset().name());
		} catch(UnsupportedEncodingException ex) {
			throw new InternalError(ex);
		}
	}

}
