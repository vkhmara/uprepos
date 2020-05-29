package ServletsOnPosts;

import Posts.JSONDecorator;
import Services.UserService;
import UtilClasses.User;
import org.apache.commons.io.IOUtils;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;

public class LoginServlet extends HttpServlet {


    @Resource(name="jdbc/mydb")
    private DataSource dataSource;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        String body = IOUtils.toString(req.getReader());
        User postRequest = JSONDecorator.getGson().fromJson(body, User.class);
        try {
            UserService.checkForUser(postRequest, dataSource);
        }
        catch (UserService.NoUser noUser) {
            writer.write(JSONDecorator.toJson("No such user"));
            return;
        }
        catch (UserService.DifferencePasswords differencePasswords) {
            writer.write(JSONDecorator.toJson("Passwords are not equal"));
            return;
        }
        writer.write(JSONDecorator.toJson("Success"));
        req.getSession().setAttribute("username", postRequest.username);
    }
}
