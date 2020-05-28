package ServletsOnPosts;

import Posts.UtilClasses.JSONDecorator;
import WorkWithDB.WorkWithDB;
import org.apache.commons.io.IOUtils;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;

public class TakeLikeServlet extends HttpServlet {

    @Resource(name="jdbc/mydb")
    private DataSource dataSource;

    static class PairForLike{
        public String idOfPost;
        public String username;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String body = IOUtils.toString(req.getReader());
        PairForLike postRequest = JSONDecorator.getGson().fromJson(body, PairForLike.class);
        resp.getWriter().write(JSONDecorator.toJson(
                WorkWithDB.takeLike(postRequest.idOfPost, postRequest.username, dataSource)));
    }
}
