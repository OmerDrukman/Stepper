package controllers;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import jdk.nashorn.internal.parser.JSONParser;
import play.*;
import play.libs.Json;
import play.mvc.*;
import scala.util.parsing.json.JSONObject;
import views.html.*;

import com.fasterxml.jackson.databind.JsonNode;

public class Application extends Controller {

    public static Result index() {
        return ok("");
    }	
	
    public static Result upload() {
    	Http.MultipartFormData body = request().body().asMultipartFormData();
        if(body == null)
        {
            return badRequest("Invalid request, required is POST with enctype=multipart/form-data.");
        }
 
        Http.MultipartFormData.FilePart filePart = body.getFile("file");
        if(filePart == null)
        {
             return badRequest("Invalid request, no file has been sent.");
        }
        
        File fileData = filePart.getFile();
        File newFile = new File("C:\\Users\\Omer\\Documents\\Projects\\Stepper\\StepUp\\public\\data\\tar1.txt");
 
        // handle file
        InputStream input = null;
        OutputStream output = null;
        
        try {
        	input = new FileInputStream(fileData);
        	output = new FileOutputStream(newFile);
        	byte[] buf = new byte[1024];
        	int bytesRead;
        	while((bytesRead = input.read(buf)) > 0) {
        		output.write(buf, 0, bytesRead);
        	}
        } catch (Exception e) {
        	return badRequest("Invalid file.");
		} finally {
        	try {
				input.close();
				output.close();
			} catch (IOException e) {
				return badRequest("Invalid file.");
			}
        	
        }
        
        return redirect("/");    
    }
    
    public static Result getWorkTime() {
    	
    	String result = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\Omer\\Documents\\Projects\\Stepper\\StepUp\\public\\data\\tar1.txt"));
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();
            line = "[";
            while (line != null) {
                sb.append(line);
                line = br.readLine();
            }
            result = sb.toString();
        } catch(Exception e) {
            e.printStackTrace();
        }

        return ok(result);
    }
}
