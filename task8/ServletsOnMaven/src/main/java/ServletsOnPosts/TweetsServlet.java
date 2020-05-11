package ServletsOnPosts;

import Posts.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TweetsServlet extends HttpServlet {

    public static final String NO_POST_MESSAGE = "No post with such id.";
    public static final String NOT_ADDED_POST_MESSAGE = "Post was not added.";

    @Override
    public void init() throws ServletException {
        String jsonText;
        ServletContext sc = getServletContext();
        try (InputStream stm = sc.getResourceAsStream("posts.json")) {
            jsonText = IOUtils.toString(stm, StandardCharsets.UTF_8);
            Post[] postsFromFile = JSONDecorator.getGson().fromJson(jsonText, Post[].class);
            PostsContainer.addAll(Arrays.asList(postsFromFile));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        if (id == null) {
            return;
        }
        PrintWriter writer = resp.getWriter();
        Post foundPost = PostsContainer.getPostByID(id);
        if (foundPost == null) {
           writer.print(NO_POST_MESSAGE);
        } else {
            resp.setContentType("application/json");
            writer.print(foundPost.toJson());
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        try {
            String id = req.getParameter("id");
            String author = req.getParameter("author");
            LocalDateTime createdAt = LocalDateTime.parse(req.getParameter("createdAt"));
            String description = req.getParameter("description");
            String[] hashTagsArray = req.getParameterValues("hashTags");
            List<String> hashTags;
            if (hashTagsArray == null) {
                hashTags = new ArrayList<>();
            }
            else {
                hashTags = Arrays.asList(hashTagsArray);
            }
            String[] likesArray = req.getParameterValues("likes");
            List<String> likes;
            if (likesArray == null) {
                likes = new ArrayList<>();
            }
            else {
                likes = Arrays.asList(likesArray);
            }
            String photoLink = req.getParameter("photoLink");
            Post post = new Post(id, author, createdAt, description, hashTags, likes, photoLink);
            if (!PostsContainer.addPost(post)) {
                writer.print(NOT_ADDED_POST_MESSAGE);
            }
            else {
                writer.print("Post was added.\n");
                writer.print(post.toJson());
            }
        }
        catch (Exception e) {
            writer.print("Exception");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        if (id == null) {
            return;
        }
        PrintWriter writer = resp.getWriter();
        Post foundPost = PostsContainer.getPostByID(id);
        if (foundPost == null) {
            writer.print(NO_POST_MESSAGE);
        } else {
            PostsContainer.removePost(id);
            resp.setContentType("application/json");
            writer.print(foundPost.toJson());
        }
    }
}
