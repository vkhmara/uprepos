package UtilClasses;

import java.util.Base64;

public class WorkWithPasswords {

    public static String getHash(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    public static boolean isEqualHash(String password, String hashPassword) throws NullPointerException {
        return Base64.getEncoder().encodeToString(password.getBytes()).equals(hashPassword);
    }
}
