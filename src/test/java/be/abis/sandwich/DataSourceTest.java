package be.abis.sandwich;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@SpringBootTest
public class DataSourceTest {


    @Autowired
    DataSource dataSource;


    @Test
    public void connectionViaOracleWorks()  {
        try (Connection c = dataSource.getConnection()){
            System.out.println("connection succeeded via "
                    + c.getMetaData().getDatabaseProductName() + "." );
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

}

