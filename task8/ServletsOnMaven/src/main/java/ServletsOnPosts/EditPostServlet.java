package ServletsOnPosts;

import UtilClasses.EditInfo;
import UtilClasses.JSONDecorator;
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

public class EditPostServlet extends HttpServlet {

    @Resource(name="jdbc/mydb")
    private DataSource dataSource;

    static class InfoForRequest {
        String id;
        EditInfo editInfo;
    }

    public static final String NO_EDITED = "Post was not edited";
    public static final String YES_EDITED = "Post was edited";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        String body = IOUtils.toString(req.getReader());
        InfoForRequest postRequest = JSONDecorator.getGson().fromJson(body, InfoForRequest.class);
        if (!postRequest.editInfo.validate()) {
            writer.write(JSONDecorator.toJson(NO_EDITED));
        }
        else {
            WorkWithDB.editPost(postRequest.id, postRequest.editInfo, dataSource);
            writer.write(JSONDecorator.toJson(YES_EDITED));
        }
    }
}
