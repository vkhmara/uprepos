package ServletsOnPosts;

import Services.UserService;
import UtilClasses.JSONDecorator;
import UtilClasses.User;
import WorkWithDB.WorkWithDB;
import org.apache.commons.io.IOUtils;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;

public class SignupServlet extends HttpServlet {

    @Resource(name="jdbc/mydb")
    private DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        String username = req.getParameter("username");
        try {
            UserService.checkForUser(new User(username, ""), dataSource);
        }
        catch (UserService.NoUser e) {
            writer.write(JSONDecorator.toJson("No such user"));
            return;
        }
        catch (UserService.DifferencePasswords ignored) {}
        writer.write(JSONDecorator.toJson("Yes such user"));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        String body = IOUtils.toString(req.getReader());
        User newUser = Posts.JSONDecorator.getGson().fromJson(body, User.class);
        WorkWithDB.addUser(newUser, dataSource);
        req.getSession().setAttribute("username", newUser.username);
        writer.write(JSONDecorator.toJson("Success"));
    }
}
