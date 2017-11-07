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

public class OverviewJdbcConnection extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


    String sql = req.getParameter("sql").toString();
    String details = req.getParameter("details").toString();

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

           sql = "";
           JSONArray jArray = new JSONArray();
           String status = "";
           int count= 0;
           String proposition = "";
           String month = "";
           int implemented = 0;
           int not_committed = 0;
           int in_progress = 0;
           
           //Get the data from the result set.
           while(rs.next()){
              //Retrieve two columns.
            if(details.equals("pie")){
              status = rs.getString("status");
              count = rs.getInt("count");
            

              JSONObject jobj = new JSONObject();
              jobj.put("status", status);
              jobj.put("count", count);
              jArray.add(jobj);
              }
            else if(details.equals("horizontal")){
              proposition = rs.getString("proposition");
              implemented = rs.getInt("implemented");
              not_committed = rs.getInt("not_committed");
              in_progress = rs.getInt("in_progress");
            

              JSONObject jobj = new JSONObject();
              jobj.put("proposition", proposition);
              jobj.put("implemented", implemented);
              jobj.put("not_committed", not_committed);
              jobj.put("in_progress", in_progress);
              jArray.add(jobj);
              }
            else if(details.equals("vertical")){
              month = rs.getString("month");
              implemented = rs.getInt("implemented");
              not_committed = rs.getInt("not_committed");
              in_progress = rs.getInt("in_progress");
            

              JSONObject jobj = new JSONObject();
              jobj.put("month", month);
              jobj.put("implemented", implemented);
              jobj.put("not_committed", not_committed);
              jobj.put("in_progress", in_progress);
              jArray.add(jobj);
              }
            else if(details.equals("performance")){
              month = rs.getString("month_des");
              proposition = rs.getString("proposition");
              float crashrate = rs.getFloat("crashrate");
              float crashrate_delta = rs.getFloat("crashrate_delta");
              float firstlaunches = rs.getFloat("firstlaunches");
              float firstlaunches_delta = rs.getFloat("firstlaunches_delta");
              float total_unique_visitors = rs.getFloat("total_unique_visitors");
              float total_unique_visitors_delta = rs.getFloat("total_unique_visitors_delta");
              float thirty_ret_rate = rs.getFloat("thirty_ret_rate");
              float thirty_ret_rate_delta = rs.getFloat("thirty_ret_rate_delta");
              float avg_weekly_launch_per_user = rs.getFloat("avg_weekly_launch_per_user");
              float avg_weekly_launch_per_user_delta = rs.getFloat("avg_weekly_launch_per_user_delta");
              float total_avg_rating = rs.getFloat("total_avg_rating");
              float total_avg_rating_delta = rs.getFloat("total_avg_rating_delta");
              float marketable_reg_rate = rs.getFloat("marketable_reg_rate");
              float marketable_reg_rate_delta = rs.getFloat("marketable_reg_rate_delta");
            

              JSONObject jobj = new JSONObject();
              jobj.put("month", month);jobj.put("proposition", proposition);
              jobj.put("crashrate", crashrate);jobj.put("crashrate_delta", crashrate_delta);
              jobj.put("firstlaunches", firstlaunches);jobj.put("firstlaunches_delta", firstlaunches_delta);
              jobj.put("total_unique_visitors", total_unique_visitors);jobj.put("total_unique_visitors_delta", total_unique_visitors_delta);
              jobj.put("thirty_ret_rate", thirty_ret_rate);jobj.put("thirty_ret_rate_delta", thirty_ret_rate_delta);
              jobj.put("avg_weekly_launch_per_user", avg_weekly_launch_per_user);jobj.put("avg_weekly_launch_per_user_delta", avg_weekly_launch_per_user_delta);
              jobj.put("total_avg_rating", total_avg_rating);jobj.put("total_avg_rating_delta", total_avg_rating_delta);
              jobj.put("marketable_reg_rate", marketable_reg_rate);jobj.put("marketable_reg_rate_delta", marketable_reg_rate_delta);
              jArray.add(jobj);
            }
            else if(details.equals("scale")){
              month = rs.getString("month_des");
              float total_unique_visitors = rs.getFloat("total_unique_visitors");
              float total_unique_visitors_delta = rs.getFloat("total_unique_visitors_delta");
              float thirty_day_retention = rs.getFloat("thirty_day_retention");
              float thirty_day_retention_delta = rs.getFloat("thirty_day_retention_delta");
              float ninty_day_retention = rs.getFloat("ninty_day_retention");
              float ninty_day_retention_delta = rs.getFloat("ninty_day_retention_delta");
              float engaged_visitors = rs.getFloat("engaged_visitors");
              float engaged_visitors_delta = rs.getFloat("engaged_visitors_delta");
              float marketable_optin = rs.getFloat("marketable_optin");
              float marketable_optin_delta = rs.getFloat("marketable_optin_delta");
              float buybuttonclicks = rs.getFloat("buybuttonclicks");
              float buybuttonclicks_delta = rs.getFloat("buybuttonclicks_delta");
            

              JSONObject jobj = new JSONObject();
              jobj.put("month", month);
              jobj.put("total_unique_visitors", total_unique_visitors);jobj.put("total_unique_visitors_delta", total_unique_visitors_delta);
              jobj.put("thirty_day_retention", thirty_day_retention);jobj.put("thirty_day_retention_delta", thirty_day_retention_delta);
              jobj.put("ninty_day_retention", ninty_day_retention);jobj.put("ninty_day_retention_delta", ninty_day_retention_delta);
              jobj.put("engaged_visitors", engaged_visitors);jobj.put("engaged_visitors_delta", engaged_visitors_delta);
              jobj.put("marketable_optin", marketable_optin);jobj.put("marketable_optin_delta", marketable_optin_delta);
              jobj.put("buybuttonclicks", buybuttonclicks);jobj.put("buybuttonclicks_delta", buybuttonclicks_delta);
              jArray.add(jobj);
            }
           }

            String name = jArray.toString();
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
