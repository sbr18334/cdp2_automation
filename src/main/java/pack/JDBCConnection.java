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

public class JDBCConnection extends HttpServlet {

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
            if(details.equals("months")){
              name = rs.getString("month_des");
              JSONObject jobj = new JSONObject();
              jobj.put("id", id);
              jobj.put("name", name);
              jArray.add(jobj);

              id = id+1;
            }
            else if(details.equals("proposition")){
              name  = rs.getString("proposition");
              JSONObject jobj = new JSONObject();
              jobj.put("id", id);
              jobj.put("name", name);
              jArray.add(jobj);

              id = id+1;
            }
            else if(details.equals("suggestion")){
              String status  = rs.getString("status");
              int prio  = rs.getInt("prio");
              String theme  = rs.getString("theme");
              String key_insights  = rs.getString("key_insights");
              String recommendations  = rs.getString("recommendations");

              JSONObject jobj = new JSONObject();
              jobj.put("status", status);
              jobj.put("prio", prio);
              jobj.put("theme", theme);
              jobj.put("key_insights", key_insights);
              jobj.put("recommendations", recommendations);
              jArray.add(jobj);
            }
            else if(details.equals("rating")){
              int ios_1  = rs.getInt("ios_1star");
              int ios_2  = rs.getInt("ios_2star");
              int ios_3  = rs.getInt("ios_3star");
              int ios_4  = rs.getInt("ios_4star");
              int ios_5  = rs.getInt("ios_5star");
              int android_1 = rs.getInt("android_1star");
              int android_2 = rs.getInt("android_2star");
              int android_3 = rs.getInt("android_3star");
              int android_4 = rs.getInt("android_4star");
              int android_5 = rs.getInt("android_5star");
              int total_1 = rs.getInt("total_1star");
              int total_2 = rs.getInt("total_2star");
              int total_3 = rs.getInt("total_3star");
              int total_4 = rs.getInt("total_4star");
              int total_5 = rs.getInt("total_5star");

              JSONObject jobj = new JSONObject();
              jobj.put("ios_1", ios_1);jobj.put("ios_2", ios_2);jobj.put("ios_3", ios_3);
              jobj.put("ios_4", ios_4);jobj.put("ios_5", ios_5);
              jobj.put("android_1", android_1);jobj.put("android_2", android_2);jobj.put("android_3", android_3);
              jobj.put("android_4", android_4);jobj.put("android_5", android_5);
              jobj.put("total_1", total_1);jobj.put("total_2", total_2);jobj.put("total_3", total_3);
              jobj.put("total_4", total_4);jobj.put("total_5", total_5);

              jArray.add(jobj);
            }
            else if(details.equals("metric")){
              // month = rs.getString("month_des");
              // proposition = rs.getString("proposition_recommendation");
              float errorrate = rs.getFloat("errorrate");
              float errorrate_delta = rs.getFloat("errorrate_delta");
              float crashrate = rs.getFloat("crashrate");
              float crashrate_delta = rs.getFloat("crashrate_delta");
              float firstlaunches = rs.getFloat("firstlaunches");
              float firstlaunches_delta = rs.getFloat("firstlaunches_delta");
              float total_unique_visitors = rs.getFloat("total_unique_visitors");
              float total_unique_visitors_delta = rs.getFloat("total_unique_visitors_delta");
              float thirty_ret_rate = rs.getFloat("thirty_ret_rate_prospect");
              float thirty_ret_rate_delta = rs.getFloat("thirty_day_retention_prospect_delta");
              float thirty_ret_rate_owner = rs.getFloat("thirty_ret_rate_owner");
              float thirty_ret_rate_owner_delta = rs.getFloat("thirty_day_retention_owner_delta");
              float ninty_ret_rate = rs.getFloat("ninty_ret_rate");
              float ninty_ret_rate_delta = rs.getFloat("ninty_ret_rate_delta");
              float avg_weekly_launch_per_user = rs.getFloat("avg_weekly_launch_per_user");
              float avg_weekly_launch_per_user_delta = rs.getFloat("avg_weekly_launch_per_user_delta");
              float engaged = rs.getFloat("%engaged");
              float engaged_delta = rs.getFloat("%engaged_delta");
              float total_avg_rating = rs.getFloat("total_avg_rating");
              float total_avg_rating_delta = rs.getFloat("total_avg_rating_delta");
              float mat_avg_product_rating = rs.getFloat("mat_avg_product_rating");
              float mat_avg_product_rating_delta = rs.getFloat("mat_avg_product_rating_delta");
              float marketable_reg_rate = rs.getFloat("marketable_reg_rate");
              float marketable_reg_rate_delta = rs.getFloat("marketable_reg_rate_delta");
              float buybuttonclicks = rs.getFloat("buybuttonclicks");
              float buybuttonclicks_delta = rs.getFloat("buybuttonclicks_delta");
            

              JSONObject jobj = new JSONObject();
              // jobj.put("month", month);jobj.put("proposition", proposition);
              jobj.put("errorrate", errorrate);jobj.put("errorrate_delta", errorrate_delta);
              jobj.put("crashrate", crashrate);jobj.put("crashrate_delta", crashrate_delta);
              jobj.put("firstlaunches", firstlaunches);jobj.put("firstlaunches_delta", firstlaunches_delta);
              jobj.put("total_unique_visitors", total_unique_visitors);jobj.put("total_unique_visitors_delta", total_unique_visitors_delta);
              jobj.put("thirty_ret_rate", thirty_ret_rate);jobj.put("thirty_ret_rate_delta", thirty_ret_rate_delta);
              jobj.put("thirty_ret_rate_owner", thirty_ret_rate_owner);jobj.put("thirty_ret_rate_owner_delta", thirty_ret_rate_owner_delta);
              jobj.put("ninty_ret_rate", ninty_ret_rate);jobj.put("ninty_ret_rate_delta", ninty_ret_rate_delta);
              jobj.put("avg_weekly_launch_per_user", avg_weekly_launch_per_user);jobj.put("avg_weekly_launch_per_user_delta", avg_weekly_launch_per_user_delta);
              jobj.put("engaged", engaged);jobj.put("engaged_delta", engaged_delta);
              jobj.put("total_avg_rating", total_avg_rating);jobj.put("total_avg_rating_delta", total_avg_rating_delta);
              jobj.put("mat_avg_product_rating", mat_avg_product_rating);jobj.put("mat_avg_product_rating_delta", mat_avg_product_rating_delta);
              jobj.put("marketable_reg_rate", marketable_reg_rate);jobj.put("marketable_reg_rate_delta", marketable_reg_rate_delta);
              jobj.put("buybuttonclicks", buybuttonclicks);jobj.put("buybuttonclicks_delta", buybuttonclicks_delta);
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
