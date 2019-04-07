//Variables
var bjjList = ["guard", "berimbolo", "kimura","armlock","leglock","delariva", "maodevaca","passagemdeguarda"];
var secretWord = "";
var secretLetters = [];
var numBlanks = 0;
var displayWord = [];
var wrongGuesses = [];
//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;

//Function startGame - reset variables and guesses. Select random word from bjjList
function startGame() {
     secretWord = bjjList[Math.floor(Math.random() * bjjList.length)];
     secretLetters = secretWord.split("");
     numBlanks = secretLetters.length;
     guessesLeft = 10;
     wrongGuesses = [];
     displayWord = [];
     for (var i = 0; i <numBlanks; i++){
         displayWord.push("_");
     }
     //Write in html
    document.getElementById("secretWord").innerHTML = displayWord.join(" ");// put space in html text
    document.getElementById("guessCounter").innerHTML = ("Guesses Remaining: " + guessesLeft);
    document.getElementById("winCounter").innerHTML = ("Games Won: " + winCount);
    document.getElementById("lossCounter").innerHTML = ("Games Lost: " + lossCount);
    document.getElementById("wrongGuesses").innerHTML = ("Wrong Guesses: " + wrongGuesses);
}
// check if the letter is in the word. If not decrease guessesLeft
function checkLetters(letter) {
    var letterPresence = false;
    for (var i = 0; i <numBlanks; i++){
        if(secretWord[i] == letter) {
            letterPresence = true;
        }
    }
    if(letterPresence) {
        for(var i=0; i<= numBlanks; i++){
            if(secretWord[i] == letter){
                displayWord[i] = letter;
            }
        }
    }
    else {
        wrongGuesses.push(letter);
        guessesLeft--
    }
}

function roundComplete(){
    document.getElementById("guessCounter").innerHTML =("Guesses Remaining: " + guessesLeft);
    document.getElementById("secretWord").innerHTML = displayWord.join(" ");
    document.getElementById("wrongGuesses").innerHTML = ("Wrong Guessses: " + wrongGuesses.join(" "));
    if(secretLetters.toString() == displayWord.toString()){
        document.getElementById("secretWord").innerHTML = displayWord.join(" ");   
        winCount++;
        var snd = new Audio("./assets/audio/pegasu.mp3");
        snd.play();
        setTimeout(function(){ snd.pause() }, 3000);
        setTimeout(function(){ alert("Winner!"); }, 1500);
        // alert("Winner!");
        document.getElementById("winCounter").innerHTML = winCount;
        setTimeout(function(){ startGame(); }, 2000);
        // startGame();
    } 
    else if (guessesLeft ==0){
        lossCount++;
        alert("You Lose");
        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
    }
}

startGame();
   document.onkeyup = function(event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    
}