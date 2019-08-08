/* 
$(document).ready(function() {
    database.ref("/chat-data").set({
        chat
    });
});
 */

var chatNum = 0;

$("#chat-submit").on("click", function(event) {
    event.preventDefault();

    console.log("Submit clicked");
    
    console.log($("#chat-input-box").val().trim());

    var tempChat = $("<h5>");

    database.ref("/chat-data/data-" + (++chatNum)).set({
        chat: $("#chat-input-box").val().trim()
    });
    
    database.ref("/chat-data/data-" + chatNum).on("value", function(snapshot) {
        tempChat.text(snapshot.val().chat);
    });

    $("#chat-placehold").append(tempChat);
    
    
    

});   