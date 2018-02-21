package pack;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelOutput extends HttpServlet{

   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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
	           String sql = "select * from cdp2monthlyrpt.monthlyrpt_recomendation order by id asc;";
	           ResultSet rs = stmt.executeQuery(sql);

      
      @SuppressWarnings("resource")
	   XSSFWorkbook workbook = new XSSFWorkbook(); 
      XSSFSheet spreadsheet = workbook.createSheet("Recommendations");
      
      XSSFRow row = spreadsheet.createRow(0);
      
      spreadsheet.setColumnWidth(0, 3000);
      spreadsheet.setColumnWidth(1, 7500);
      spreadsheet.setColumnWidth(2, 45500);
      
      XSSFCellStyle cellStyle = workbook.createCellStyle();
      cellStyle = workbook.createCellStyle();
      XSSFFont hSSFFont = workbook.createFont();
      hSSFFont.setBold(true);
      cellStyle.setFont(hSSFFont);
      
      XSSFCell cell;
      cell = row.createCell(0);
      cell.setCellValue("MONTH");
      cell.setCellStyle(cellStyle);
      cell = row.createCell(1);
      cell.setCellValue("PROPOSITION");
      cell.setCellStyle(cellStyle);
      cell = row.createCell(2);
      cell.setCellValue("RECOMMENDATION_TEXT");
      cell.setCellStyle(cellStyle);
      
      int i = 1;

      while(rs.next()) {
       spreadsheet.setDefaultRowHeight((short) 1000);
        int count = 0;
        int row_count = 0;
        for (int j = 0; j < i; j++) {
          Row row1 = spreadsheet.getRow(j);
          if(row1 != null) {
            if(row1.getCell(0).toString().equals(rs.getString("month")) && row1.getCell(1).toString().equals(rs.getString("proposition"))){
               count++;
               row_count = j;
               break;
            }
          }
       }
       if(count>0){
         Row row2 = spreadsheet.getRow(row_count);
         String value = row2.getCell(2).toString();
         row2.getCell(2).setCellValue(value+"\n \n"+rs.getString("key_insights")+"\n"+rs.getString("recommendations"));
       }
       else if(count == 0){
            row.setHeightInPoints((2*spreadsheet.getDefaultRowHeightInPoints()));
          //row.setHeight((short));
          CellStyle cs = workbook.createCellStyle();
          cs.setWrapText(true);
            row = spreadsheet.createRow(i);
            cell = row.createCell(0);
            cell.setCellValue(rs.getString("month"));
            cell = row.createCell(1);
            cell.setCellValue(rs.getString("proposition"));
            cell = row.createCell(2);
            cell.setCellValue(rs.getString("key_insights")+"\n"+rs.getString("recommendations"));
          cell.setCellStyle(cs);
            i++;
       }
      }

      resp.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8");
      resp.addHeader("Content-Disposition", "attachment; filename=\"excel.xlsx");
	   workbook.write(resp.getOutputStream());
	        }
	      catch(Exception e){
	        	System.out.println(e.getMessage());
	      }
	}
}