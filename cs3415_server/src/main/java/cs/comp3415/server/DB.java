package cs.comp3415.server;

import java.sql.Connection;
import java.sql.SQLException;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class DB {

	private HikariDataSource hikariDataSource;
	
	public DB(Configuration config) {
		HikariConfig hikariConfig = new HikariConfig();
		hikariConfig.setJdbcUrl(config.getDBHost());
		hikariConfig.setUsername(config.getDBUser());
		hikariConfig.setPassword(config.getDBPassword());
		hikariConfig.setConnectionTimeout(10L * 1000L);
		hikariConfig.setIdleTimeout(120L * 1000L);
		hikariConfig.setMaxLifetime(300L * 1000L);
		hikariConfig.setMinimumIdle(2);
		hikariConfig.setMaximumPoolSize(10);
		hikariConfig.setLeakDetectionThreshold(2000L);
		hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");

		hikariDataSource = new HikariDataSource(hikariConfig);
	}
	
	public Connection getConnection() {
		try {
			return hikariDataSource.getConnection();
		} catch (SQLException e) {
			System.out.println("No SQL connections currently available");
		}
		return null;
	}
	
	public void shutdown() {
		hikariDataSource.shutdown();
	}
}
