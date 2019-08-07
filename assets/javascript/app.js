// To make the program initiates when two users has made
// their selections.
var player1Ready = false;
var player2Ready = false;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAMyeTsZApGUb4-hE4SAn6uTimbd59kXMU",
    authDomain: "rps-multiplayer-7f536.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-7f536.firebaseio.com",
    projectId: "rps-multiplayer-7f536",
    storageBucket: "",
    messagingSenderId: "1069638987975",
    appId: "1:1069638987975:web:f7175fc8d7efc37a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

/* ------------------------------------------------------------------------------------------------ */
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#number-of-players").text(snap.numChildren());
  });
  

/* ------------------------------------------------------------------------------------------------ */

function gameReadyDetector() {
    if(player1Ready && player2Ready) {
        initializeGame();
    } else {
        console.log("Not enough input to start the game");
    }
}




// The $(document).ready() method is used to make sure that all the function are available
// after the document is fully loaded. Whatever inside .ready() will be executed
// after ducument is loaded.
$(document).ready(function() {
    
    // 서브밋 버튼을 누르면 플레이어 원이나 투가 있나 없냐에 따라서 update가 달라진다.
    $("#player1-submit").on("click", function(event) {
        event.preventDefault();
        
        // Storing the user input into the variables
        var player1Name = $("#player1-name").val().trim();
        var player1Select = $(':radio[name=player1-test]:checked').val().trim();
        console.log("Player 1: ", player1Name, "/ Selected: ", player1Select);

        // Saving the user data into the firebase database
        database.ref("/player-data/player1-data").set({
            name: player1Name,
            selection: player1Select
        });
      
    
        player1Ready = true;
        gameReadyDetector();
    
    });

    $("#player2-submit").on("click", function(event) {
        event.preventDefault();
        
        // Storing the user input into the variables
        var player2Name = $("#player2-name").val().trim();
        var player2Select = $(':radio[name=player2-test]:checked').val().trim();
        console.log("Player 2: ", player2Name, "/ Selected: ", player2Select);

        // Saving the user data into the firebase database
        database.ref("/player-data/player2-data").set({
            name: player2Name,
            selection: player2Select
        });
        
        player2Ready = true;
        gameReadyDetector();
    
    });    
    
});

function gameResult(player1Name, player1Select, player2Name, player2Select) {
    //$("#game-result").clear();
    var gameTag = $("<h4>");

    if(player1Select === player2Select) {
        //console.log("Game Draw!");
        gameTag.text("Game Draw!");


    } else {
        if((player1Select === 'rock' && player2Select === 'scissor') ||
           (player1Select === 'scissor' && player2Select === 'paper') ||
           (player1Select === 'paper' && player2Select === 'rock')) {
            
            //console.log("Player 1 win!");
            gameTag.text(player1Name + " wins!");
        } else {
            
            //console.log("Player 2 win!");
            gameTag.text(player2Name + " wins!");
        }
    }

    $("#game-result").append(gameTag);
}
  
function initializeGame() {
    console.log("initializaing the game");
    
    // Getting player 1 and player 2 data from Firebase
    database.ref("/player-data").on("value", function(snapshot) {
        var player1Name = snapshot.child("player1-data").val().name;
        var player1Select = snapshot.child("player1-data").val().selection;

        var player2Name = snapshot.child("player2-data").val().name;
        var player2Select = snapshot.child("player2-data").val().selection;

        gameResult(player1Name, player1Select, player2Name, player2Select);

        
    });
    
    
}