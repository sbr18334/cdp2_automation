package pack;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.*;

import org.json.simple.JSONObject;
import org.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import com.google.gson.Gson;

public class JsonWriter extends HttpServlet  {  
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String summary = req.getParameter("summary").toString();
        String details = req.getParameter("details").toString();
        //String metric = req.getParameter("metric").toString();
        
        System.out.println("summary"+summary);
        
		try{
			JSONObject jsonObject = new JSONObject();
			String path=getServletContext().getRealPath("/resources/data.json");
		    // Add the values to the jsonObject
		    jsonObject.put("summary", summary);
		    jsonObject.put("details", details);
		    //jsonObject.put("metric", metric);

		    // Create a new FileWriter object
		    File f = new File("test.json");
		    System.out.println("Path is "+path);
		    FileWriter fileWriter = new FileWriter(path);
		   
		    // Writting the jsonObject into sample.json
		    fileWriter.write(jsonObject.toJSONString());
            fileWriter.flush();
		    fileWriter.close();
		
		    System.out.println("JSON Object Successfully written to the file!!");
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}

}