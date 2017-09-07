package pack;

import com.pdfcrowd.*;
import java.io.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class pdfWriter extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try 
        {
            FileOutputStream fileStream;     
 
            // create an API client instance
            Client client = new Client("spcr92", "42e987f6032006611081a622469b0b43");

            // convert a web page and save the PDF to a file
            fileStream = new FileOutputStream("example.pdf");
            //client.convertURI("http://cdp2uiatomation-env.wvwrjpmde3.us-east-2.elasticbeanstalk.com/scripts/login/login.html", fileStream);
            //client.convertURI("http://pdfcrowd.com/forums/read.php?3,666", fileStream);
            client.convertURI("http://pdfcrowd.com/forums/read.php?3,666",fileStream);
            //client.convertURI("http://www.cdp2uiatomation-env.wvwrjpmde3.us-east-2.elasticbeanstalk.com/#/error", fileStream);
            //client.convertURI("http://www.cdp2uiatomation-env.wvwrjpmde3.us-east-2.elasticbeanstalk.com/#/overview/performance", fileStream);
            fileStream.close();
            fileStream = new FileOutputStream("example.pdf");
            client.convertURI("http://google.com",fileStream);
            fileStream.close();
            System.out.println("done");
/*
            // convert an HTML string and store the PDF into a byte array
            ByteArrayOutputStream memStream  = new ByteArrayOutputStream();
            String html = "<html><body>In-memory HTML.</body></html>";
            client.convertHtml(html, memStream);

            // convert an HTML file
//            fileStream = new FileOutputStream("file.pdf");
//            client.convertFile("C:/Users/310231680/Downloads/file.html", fileStream);
//            fileStream.close();
*/
            // retrieve the number of credits in your account
            Integer ncredits = client.numTokens();
        }
        catch(PdfcrowdError why) {
            System.err.println(why.getMessage());
        }
        catch(IOException exc) {
            // handle the exception
        }
        System.out.println("done from outside");
    }

}
