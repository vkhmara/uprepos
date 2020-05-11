package OldServletsFromTask5;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StaticPageServlet extends HttpServlet {

    public static final String STATIC_PAGE = "WEB-INF/page.html";
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher(STATIC_PAGE).forward(request, response);
    }
}
