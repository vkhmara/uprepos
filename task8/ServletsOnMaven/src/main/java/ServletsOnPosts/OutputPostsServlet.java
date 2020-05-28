package ServletsOnPosts;

import Posts.*;
import Posts.JSONDecorator;
import UtilClasses.*;
import WorkWithDB.WorkWithDB;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class OutputPostsServlet extends HttpServlet {

    @Resource(name="jdbc/mydb")
    private DataSource dataSource;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String skipParam = req.getParameter("skip");
        String countParam = req.getParameter("count");
        int skip;
        int count;
        if (skipParam == null) {
            skip = 0;
        } else {
            skip = Integer.parseInt(skipParam);
        }
        if (countParam == null) {
            count = 10;
        } else {
            count = Integer.parseInt(countParam);
        }
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

        FilterParams filterParams = new FilterParams(
                authorParam == null ? "" : authorParam,
                new DateInterval(
                        LocalDateTime.ofEpochSecond(
                                leftMilliSeconds / 1000,
                                (int)(leftMilliSeconds % 1000)*1000000,
                                ZoneOffset.UTC).plusHours(3),
                        LocalDateTime.ofEpochSecond(
                                rightMilliSeconds / 1000,
                                (int)(rightMilliSeconds % 1000)*1000000,
                                ZoneOffset.UTC).plusHours(3)
                ), hashTags);

        List<Post> posts = WorkWithDB.getPostsFromInterval(filterParams, skip, count, dataSource);
        PrintWriter writer = resp.getWriter();
        writer.write(JSONDecorator.toJson(posts.toArray()));
    }
}
