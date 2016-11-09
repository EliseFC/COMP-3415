package cs.comp3415.server.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class SQL {

	private Connection conn;
	private PreparedStatement ps;
	private ResultSet rs;
	private boolean closeConnection = true;
	
	public SQL(Connection conn) {
		this.conn = conn;
	}
	
	public static SQL query(String statement, Connection conn) throws SQLException {
		SQL sql = new SQL(conn).prepare(statement);
		return sql;
	}
	
	public SQL prepare(String statement) throws SQLException {
		ps = conn.prepareStatement(statement);
		return this;
	}
	
	public SQL setString(int num, String val) throws SQLException {
		ps.setString(num, val);
		return this;
	}
	
	public SQL setInt(int num, int val) throws SQLException {
		ps.setInt(num, val);
		return this;
	}
	
	public void execute() throws SQLException {
		ps.execute();
		ps.close();
		if(closeConnection)
			conn.close();
	}
	
	public SQL executeQuery() throws SQLException {
		rs = ps.executeQuery();
		return this;
	}
	
	public ResultSet get() {
		return rs;
	}
	
	public void close() throws SQLException {
		rs.close();
		ps.close();
		if(closeConnection)
			conn.close();
	}
	
	public SQL closeConnection(boolean bool) {
		this.closeConnection = bool;
		return this;
	}
	
	public <T> T fill(Class<T> clazz, SQLFunction<ResultSet, T> func) throws SQLException {
		T t = func.apply(rs);
		close();
		return t;
	}
	
	public <T> T fillOne(Class<T> clazz, SQLFunction<ResultSet, T> func, String errorMsg) throws SQLException {
		if(!rs.isBeforeFirst())
			throw new RuntimeException(errorMsg);
		rs.next();
		T t = func.apply(rs);
		close();
		return t;
	}
	
	public <T> List<T> fillList(Class<T> clazz, SQLFunction<ResultSet, T> func) throws SQLException {
		List<T> list = new LinkedList<>();
		while(rs.next())
			list.add(func.apply(rs));
		close();
		return list;
	}
	
	public void checkForAny(String errorMsg) throws SQLException {
		if(!rs.isBeforeFirst())
			throw new RuntimeException(errorMsg);
		close();
	}
	
	public void checkForNone(String errorMsg) throws SQLException {
		if(rs.isBeforeFirst())
			throw new RuntimeException(errorMsg);
		close();
	}
	
	@FunctionalInterface
	public interface SQLFunction<U, V> {
		V apply(U result) throws SQLException;
	}
}
