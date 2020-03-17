import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class FilterInfo implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long startMs = System.currentTimeMillis();
        filterChain.doFilter(servletRequest, servletResponse);
        long endMs = System.currentTimeMillis();

        HttpServletRequest req = (HttpServletRequest)servletRequest;

        String path = req.getRequestURL().toString();
        String method = req.getMethod();

        System.out.println(method + " " + path + "\nTime: " + (endMs-startMs));
    }

    @Override
    public void destroy() {

    }
}
