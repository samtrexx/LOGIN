package API;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Login extends HttpServlet {

    private PrintWriter outter;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        outter = response.getWriter();
        response.setContentType("text/html");
        String usuario = request.getParameter("User");
        String password = request.getParameter("password");
        PrintWriter out = response.getWriter();
        try {
            DB bd = new DB();
            bd.setConnection("com.mysql.cj.jdbc.Driver", "jdbc:mysql://localhost/usuarios?serverTimezone=UTC");
            ResultSet rs = bd.executeQuery(
                    "select * from login where USERNAME='" + usuario + "' and PASSWORD='" + password + "';");

            if (rs.next()) {
                out.println("yes");
            } else {
                out.println("no");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
