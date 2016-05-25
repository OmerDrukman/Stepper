var app = angular.module('chatApp', []);


app.controller('chatController', ['$scope', '$http', function($scope, $http) {
    $scope.login() {
        // open pewpew with websocket
        socket = new WS('ws://10.0.0.5:9000/wsInterface/' + $('#username').val()); 
                    
        socket.onmessage = writeMessages;
    }
    
    $scope.writeMessages = function(event){
        var users = JSON.parse(event);
        jQuery.each(users, function() {
            $('#MainConv').prepend('<p>'+this.data+'</p>');
        });
    }
    
    $scope.onKeyUp = function(event){
             var charCode = (event.which) ? event.which : event.keyCode ;
       
             if(charCode === 13){
                 socket.send($(this).val());
                 $(this).val('');    
             }
    };
    
}]);
// get websocket class, firefox has a different way to get it
    var WS = window['MozWebSocket'] ? window['MozWebSocket'] : WebSocket;
    
    

    var writeMessages = function(event){
        var users = JSON.parse(event);
        jQuery.each(users, function() {
            $('#MainConv').prepend('<p>'+this.data+'</p>');
        });
    }
                
      
      // if enter (charcode 13) is pushed, send message, then clear input field
    $('#InputMessage').keyup(function(event){
             var charCode = (event.which) ? event.which : event.keyCode ;
       
             if(charCode === 13){
                 socket.send($(this).val());
                 $(this).val('');    
             }
    });