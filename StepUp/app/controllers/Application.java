package controllers;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import play.*;
import play.mvc.*;
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
 
        // handle file
        try {

			String content = "This is the content to write into file";

			File file = new File("/public/data/tar1.txt");

			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}

			FileWriter fw = new FileWriter(file.getAbsoluteFile());
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(content);
			bw.close();

			System.out.println("Done");

		} catch (IOException e) {
			e.printStackTrace();
		}
        
        return ok();    
    }
}
