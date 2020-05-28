package ServletsOnPosts;

import Posts.UtilClasses.JSONDecorator;
import Posts.UtilClasses.User;
import WorkWithDB.WorkWithDB;
import org.apache.commons.io.IOUtils;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;

public class ServletsOnUsers extends HttpServlet {

    @Resource(name="jdbc/mydb")
    private DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        if (username == null) {
            resp.getWriter().write(JSONDecorator.toJson(null));
            return;
        }
        String passwordUser = WorkWithDB.getPassword(username, dataSource);
        resp.setContentType("application/json");
        resp.getWriter().write(JSONDecorator.toJson(passwordUser));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String body = IOUtils.toString(req.getReader());
        WorkWithDB.addUser(JSONDecorator.getGson().fromJson(body, User.class), dataSource);
        resp.getWriter().write(JSONDecorator.toJson("Added successfully"));
    }
}
