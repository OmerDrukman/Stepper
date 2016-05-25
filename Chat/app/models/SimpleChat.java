package models;

import play.mvc.*;
import play.libs.*;
import play.libs.F.*;
import scala.util.parsing.json.JSONObject;

import java.util.*;

import com.fasterxml.jackson.databind.JsonNode;

public class SimpleChat{

    // collect all websockets here
    public static Hashtable<String, WebSocket.Out<String>> connections = new Hashtable<String, WebSocket.Out<String>>();

    public static void start(String username, WebSocket.In<String> in, WebSocket.Out<String> out){
        
        connections.put(username, out);
        getUsers();
        
        in.onMessage(new Callback<String>(){
            public void invoke(String event){
                SimpleChat.getUsers();
            }
        });
        
        in.onClose(new Callback0(){
            public void invoke(){
                SimpleChat.getUsers();
            }
        });

    }
    
    // Iterate connection list and write incoming message
    public static void getUsers() {   	
        for (WebSocket.Out<String> out : connections.values()) {
            out.write(Json.toJson(connections.keys()).toString());
        }
    }
}
