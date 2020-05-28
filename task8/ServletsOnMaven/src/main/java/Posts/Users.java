package Posts;

import Posts.UtilClasses.User;

import java.util.HashMap;

public class Users {

    private static HashMap<String, String> users = new HashMap<>();

    private Users() {

    }

    public static String getPassword(String username) {
        return Users.users.get(username);
    }

    public static void addUser(User user) {
        Users.users.put(user.username, user.password);
    }
}
