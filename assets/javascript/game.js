//Word List
var wordList =
    [
        "sausage",
        "weinerdog",
        "anklebiter",
        "dachshund",
        "weiner",
        "bestdogever",
        "hotdog",
    ];

//Wins
var wins = 0;
//Guesses
var userGuesses = [];
//Remaining Guesses
var remainingGuesses = 0;
//Start Game
var gameStarted = false;
//Game over
var gameOver = false;
//Tries
const maxTries = 10;
//Guessable letters
var guessableLetters =
    [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]

//Set/Resetgame
function setUpGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    //get word
    currentWordIndex = Math.floor(Math.random() * (wordList.length));

    guessedLetters = [];
    guessingWord = [];

    document.getElementById("hangmanImage").src = "";

    //Set underscore length
    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        guessingWord.push("_")
    };

    //Hide images
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("weiner-image").style.cssText = "display: none";

    //Updage HTML
    updateHTML();
}

//Update HTML
function updateHTML() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        gameOver = true;
    }
};

//Images update
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};

document.onkeyup = function (event) {
    //var key = event
    if (gameOver) {
        setUpGame();
        gameOver = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            userGuess(event.key.toLowerCase());
        }
    }
};

function userGuess(letter) {
    if (remainingGuesses > 0) {
        if (gameStarted) {
            gameStarted = true;
        }

        //If not guessed yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateHTML()
    checkWin()
};

function evaluateGuess(letter) {

    var positions = [];

    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        if (wordList[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    };

    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        for (let i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }

};

//Did you win?
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("weiner-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        gameOver = true;
    }
};
