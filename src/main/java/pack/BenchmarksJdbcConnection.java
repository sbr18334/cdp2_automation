package pack;

import java.io.IOException;
import java.sql.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BenchmarksJdbcConnection extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


    String sql = req.getParameter("sql").toString();
    String details = req.getParameter("details").toString();
    System.out.println(sql+";;;"+details);

    //Redshift driver: "jdbc:redshift://x.y.us-west-2.redshift.amazonaws.com:5439/dev";
	//or "jdbc:postgresql://x.y.us-west-2.redshift.amazonaws.com:5439/dev";
    final String dbURL = "jdbc:redshift://philips-instance.cntixmobacpk.us-east-1.redshift.amazonaws.com:5439/domo"; 
    final String MasterUsername = "philips";
    final String MasterUserPassword = "Bigsquid16";

        Connection conn = null;
        Statement stmt = null;
        try{
           //Dynamically load driver at runtime.
           //Redshift JDBC 4.1 driver: com.amazon.redshift.jdbc41.Driver
           //Redshift JDBC 4 driver: com.amazon.redshift.jdbc4.Driver
           Class.forName("com.amazon.redshift.jdbc41.Driver");

           //Open a connection and define properties.
           System.out.println("Connecting to database...");
           Properties props = new Properties();

           //Uncomment the following line if using a keystore.
           //props.setProperty("ssl", "true");  
           props.setProperty("user", MasterUsername);
           props.setProperty("password", MasterUserPassword);
           conn = DriverManager.getConnection(dbURL, props);
        
           //Try a simple query.
           System.out.println("Listing system tables...");
           stmt = conn.createStatement();
           //String sql;
           //sql = "SELECT * FROM cdp2monthlyrpt.months order by month desc";
           ResultSet rs = stmt.executeQuery(sql);

           JSONArray jArray = new JSONArray();
           int id = 1;
           String name = "";
           
           //Get the data from the result set.
           while(rs.next()){
              //Retrieve two columns.
            if(details.equals("metric")){
              name = rs.getString("metric_name");

              JSONObject jobj = new JSONObject();
              jobj.put("id", id);
              jobj.put("name", name);
              jArray.add(jobj);

              id = id+1;
            }
            else if(details.equals("data")){
              String month = rs.getString("month_des");
              String proposition = rs.getString("proposition");
              Float mt_data = rs.getFloat(2);

              JSONObject jobj = new JSONObject();
              jobj.put("month", month);
              jobj.put("proposition", proposition);
              jobj.put("mt_data", mt_data);
              jArray.add(jobj);
            }
            else if(details.equals("recommendation")){
              id = rs.getInt("id");
              String month = rs.getString("month");
              String status = rs.getString("status");
              String priority = rs.getString("prio");
              String proposition = rs.getString("proposition");
              String theme = rs.getString("theme");
              String key_insights = rs.getString("key_insights");
              String recommendations = rs.getString("recommendations");
              String ticket = rs.getString("rally_ticket");
              String deadline = rs.getString("deadline");
              String outcome = rs.getString("outcome");

              

              JSONObject jobj = new JSONObject();
              jobj.put("id", id);
              jobj.put("month", month);
              jobj.put("status", status);
              jobj.put("priority", priority);
              jobj.put("proposition", proposition);
              jobj.put("theme", theme);
              jobj.put("key_insights", key_insights);
              jobj.put("recommendations", recommendations);
              jobj.put("ticket", ticket);
              jobj.put("deadline", deadline);
              jobj.put("outcome", outcome);


              jArray.add(jobj);
            }

          }

              name = jArray.toString();
              System.out.println(name);
			       resp.setContentType("html/text");
              resp.getWriter().write(name);
              
           rs.close();
           stmt.close();
           conn.close();
        }catch(Exception ex){
           //For convenience, handle all errors here.
           ex.printStackTrace();
        }finally{
           //Finally block to close resources.
           try{
              if(stmt!=null)
                 stmt.close();
           }catch(Exception ex){
           }// nothing we can do
           try{
              if(conn!=null)
                 conn.close();
           }catch(Exception ex){
              ex.printStackTrace();
           }
        }
        System.out.println("Finished connectivity test.");
     }
  }
