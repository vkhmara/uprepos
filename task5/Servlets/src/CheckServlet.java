import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class CheckServlet extends HttpServlet {
public static final String DESCRIPTION = "application/json; charset=UTF-8;";
public static final String PARAMS ="{\n" +
            "\"name\":\"username\",\n" +
            "\"success\":true,\n" +
            "\"count_of_visit\":5\n" +
            "}";
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType(DESCRIPTION);
        PrintWriter out = response.getWriter();
        out.println(PARAMS);
    }
}
