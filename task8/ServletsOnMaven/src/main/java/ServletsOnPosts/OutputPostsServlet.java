package ServletsOnPosts;

import Posts.Post;
import Posts.PostsContainer;
import org.omg.CORBA.INTERNAL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class OutputPostsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String topParam = req.getParameter("top");
        String skipParam = req.getParameter("skip");
        int top;
        int skip;
        if (topParam == null) {
            top = 10;
        } else {
            top = Integer.parseInt(topParam);
        }
        if (skipParam == null) {
            skip = 0;
        } else {
            skip = Integer.parseInt(skipParam);
        }
        List<Post> posts = PostsContainer.getPosts(null, skip, top);
        PrintWriter writer = resp.getWriter();
        posts.forEach(writer::println);
    }
}
