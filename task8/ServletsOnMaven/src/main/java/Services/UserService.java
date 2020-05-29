package Services;

import ServletsOnPosts.LoginServlet;
import UtilClasses.User;
import UtilClasses.WorkWithPasswords;
import WorkWithDB.WorkWithDB;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserService {

    public static class NoUser extends Exception{

    }

    public static class DifferencePasswords extends Exception {

    }

    public static void checkForUser(User user, DataSource dataSource) throws NoUser, DifferencePasswords {
        String password = WorkWithDB.getPassword(user.username, dataSource);
        if (password == null) {
            throw new NoUser();
        }
        if (!WorkWithPasswords.isEqualHash(password, user.password)) {
            throw new DifferencePasswords();
        }
    }
}
