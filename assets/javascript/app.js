var player1Wins = 0;
var player1Losses = 0;
var player2Wins = 0;
var player2Losses = 0;


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

database.ref("/player-data/player1-data").set({
    name: "",
    selection: "",
    player1Ready: false
});

database.ref("/player-data/player2-data").set({
    name: "",
    selection: "",
    player2Ready: false
});



// The $(document).ready() method is used to make sure that all the function are available
// after the document is fully loaded. Whatever inside .ready() will be executed
// after ducument is loaded.
$(document).ready(function() {
    

    

    $("#player1-submit").on("click", function(event) {
        event.preventDefault();
        
        // Storing the user input into the variables
        var player1Name = $("#player1-name").val().trim();
        var player1Select = $(':radio[name=player1-test]:checked').val().trim();
        console.log("Player 1: ", player1Name, "/ Selected: ", player1Select);

        // Saving the user data into the firebase database
        database.ref("/player-data/player1-data").set({
            name: player1Name,
            selection: player1Select,
            player1Ready: true
        });

        //$("#player1-selected").clear();
        $("#player1-selected").append("<h4>" + player1Name + " chose " + player1Select + "</h4>");
      
    
        
        
    
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
            selection: player2Select,
            player2Ready: true
        });
        
        $("#player2-selected").append("<h4>" + player2Name + " chose " + player2Select + "</h4>");
        
    
    });    

    // Getting player 1 and player 2 data from Firebase
    database.ref("/player-data").on("value", function(snapshot) {
        var player1Ready = snapshot.child("player1-data").val().player1Ready;
        var player2Ready = snapshot.child("player2-data").val().player2Ready;

        if(player1Ready && player2Ready) {
            initializeGame();
        }
        
    });

    
});


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


function gameResult(player1Name, player1Select, player2Name, player2Select) {
    console.log("gameResult() called");
    var gameTag = $("<h4>");

    if(player1Select === player2Select) {
        //console.log("Game Draw!");
        gameTag.text("Game Draw!");


    } else {
        if((player1Select === 'rock' && player2Select === 'scissor') ||
           (player1Select === 'scissor' && player2Select === 'paper') ||
           (player1Select === 'paper' && player2Select === 'rock')) {
            
            gameTag.text(player1Name + " wins!");
            player1Wins++;
            player2Losses++;
    
        } else {
            gameTag.text(player2Name + " wins!");
            player2Wins++;
            player1Losses++;

        }

        $("#player1-wins").text("Wins: " + player1Wins);
        $("#player1-losses").text("Losses: " + player1Losses);

        $("#player2-wins").text("Wins: " + player2Wins);
        $("#player2-losses").text("Losses: " + player2Losses);
        
    }
    $("#game-result").append(gameTag).append("<button id='current-opponent'>Try Again with Current Oppnent</button>").append("<button id='new-opponent'>Quit</button>");
    $("#current-opponent").click(function() {
        console.log("Current");

    
    })
    
    

}



