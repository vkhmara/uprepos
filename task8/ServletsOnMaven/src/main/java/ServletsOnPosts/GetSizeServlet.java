package ServletsOnPosts;

import Posts.Post;
import Posts.PostsContainer;
import Posts.UtilClasses.DateInterval;
import Posts.UtilClasses.FilterParams;
import Posts.UtilClasses.JSONDecorator;
import WorkWithDB.WorkWithDB;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GetSizeServlet extends HttpServlet {

    @Resource(name="jdbc/mydb")
    private DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String authorParam = req.getParameter("author");
        String leftDateParam = req.getParameter("left");
        String rightDateParam = req.getParameter("right");
        String hashTagsParam = req.getParameter("hashTags");
        List<String> hashTags = hashTagsParam == null ? new ArrayList<>()
                : new ArrayList<>(Arrays.asList(hashTagsParam.split("[\\s\\n\\t\\r]")));

        hashTags.removeIf(item->item.equals(""));
        hashTags.replaceAll(item->'#' + item);

        long leftMilliSeconds = leftDateParam == null ? 0 :
                Long.parseLong(leftDateParam);
        long rightMilliSeconds = rightDateParam == null
                ? LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) * 1000
                : Long.parseLong(rightDateParam);

        resp.getWriter().write(JSONDecorator.toJson(
                WorkWithDB.size(
                        new FilterParams(
                        authorParam == null ? "" : authorParam,
                        new DateInterval(
                                LocalDateTime.ofEpochSecond(
                                        leftMilliSeconds / 1000,
                                        (int)(leftMilliSeconds % 1000)*1000000,
                                        ZoneOffset.UTC),
                                LocalDateTime.ofEpochSecond(
                                        rightMilliSeconds / 1000,
                                        (int)(rightMilliSeconds % 1000)*1000000,
                                        ZoneOffset.UTC)
                        ), hashTags), dataSource)));

    }
}
