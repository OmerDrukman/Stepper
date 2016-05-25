package controllers;

import models.SimpleChat;
import play.*;
import play.mvc.*;
import views.html.*;
import com.fasterxml.jackson.databind.JsonNode;

public class Application extends Controller {

    public static Result index() {
        return ok("");
    }

	// Websocket interface
	public static WebSocket<String> wsInterface(String username) {
	    return new WebSocket<String>(){
	            
	        // called when websocket handshake is done
	        public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out){
	                SimpleChat.start(username, in, out);
	        }
	        
	        
	    };   
	}
	
}
