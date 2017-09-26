package pack;

import java.io.*;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Email extends HttpServlet{
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String to = req.getParameter("email").toString();
		String config = req.getParameter("config").toString();
		
        final String username = "sbr18334@gmail.com";
        final String password = "9949120639";

        Properties props = new Properties();
        //
        props.put("mail.smtp.user",username); 
        props.put("mail.smtp.host", "smtp.gmail.com"); 
        props.put("mail.smtp.port", "25"); 
        props.put("mail.debug", "true"); 
        props.put("mail.smtp.auth", "true"); 
        props.put("mail.smtp.starttls.enable","true"); 
        props.put("mail.smtp.EnableSSL.enable","true");

        props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");   
        props.setProperty("mail.smtp.socketFactory.fallback", "false");   
        props.setProperty("mail.smtp.port", "587");   
        props.setProperty("mail.smtp.socketFactory.port", "465");
        //

        Session session = Session.getInstance(props,
          new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
          });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("donot-reply@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                InternetAddress.parse(to));
            message.setSubject("Reset-Password link");
            message.setText("Dear User,"
                + "\n\nClick on the following link to reset the password\n\n"
            	+ config+"/scripts/reset/reset.html");

            Transport.send(message);

            System.out.println("Done");

        } 

        catch (MessagingException e) 
        {
            e.printStackTrace();
            System.out.println("Username or Password are incorrect ... exiting !");
        }
    }

}
