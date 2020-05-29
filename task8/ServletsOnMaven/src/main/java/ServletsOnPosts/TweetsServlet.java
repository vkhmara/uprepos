package ServletsOnPosts;

import Posts.*;
import Posts.JSONDecorator;
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
import java.time.LocalDateTime;
import java.util.*;

public class TweetsServlet extends HttpServlet {

    @Resource(name = "jdbc/mydb")
    private DataSource dataSource;

    public static final String NO_POST_MESSAGE = "No post with such id.";
    public static final String NO_ID = "No id.";
    public static final String NOT_ADDED_POST_MESSAGE = "Post was not added.";
    public static final String DELETED = "Post was deleted";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        if (id == null) {
            sendErrorMessage(resp.getWriter(), NO_ID);
            return;
        }
        PrintWriter writer = resp.getWriter();
        Post foundPost = WorkWithDB.getPostById(id, dataSource);
        if (foundPost == null) {
            sendErrorMessage(writer, NO_POST_MESSAGE);
        } else {
            resp.setContentType("application/json");
            writer.print(foundPost.toJson());
        }
    }

    static class InfoForPostRequest {
        String id;
        String author;
        String description;
        String createdAt;
        String[] hashTags;
        String[] likes;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        String body = IOUtils.toString(req.getReader());
        InfoForPostRequest postRequest = JSONDecorator.getGson().fromJson(body, InfoForPostRequest.class);
        try {
            LocalDateTime createdAt = LocalDateTime.parse(postRequest.createdAt.substring(0, postRequest.createdAt.length() - 5));
            createdAt = createdAt.plusHours(3);
            List<String> hashTags = new ArrayList<>(Arrays.asList(postRequest.hashTags));
            hashTags.removeIf(item -> item.equals(""));

            Post post = new Post(postRequest.id, postRequest.author, createdAt, postRequest.description, hashTags, new ArrayList<>());
            if (!post.validatePost()) {
                writer.print(JSONDecorator.toJson(NOT_ADDED_POST_MESSAGE));
            } else {
                WorkWithDB.addPost(post, dataSource);
                writer.print(post.toJson());
            }
        } catch (Exception e) {
            sendErrorMessage(writer, "Exception");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        if (id == null) {
            return;
        }
        PrintWriter writer = resp.getWriter();
        WorkWithDB.deletePost(id, dataSource);
        resp.setContentType("application/json");
        resp.getWriter().write(JSONDecorator.toJson(DELETED));
    }

    private void sendErrorMessage(PrintWriter writer, String textOfError) {
        writer.write(JSONDecorator.toJson(textOfError));
    }
}
