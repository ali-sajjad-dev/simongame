
// select the next color pattern at random
var buttonColors = ["red", "blue", "green", "yellow"];

// current level
var level = 0;

// array of patterns
var gamePattern = [];

// keep track of game over
var active = false;
var isGameOver = false;

//next pattern
function nextSequence() {
    randomNo = Math.floor(Math.random() * 4);
    // add random color button to pattern list
    gamePattern.push(buttonColors[randomNo]);
}

// playback pattern to user
async function buttonPlayBack() {
    var i = 0;

    function playLoop() {
        setTimeout( function() {
            playBack(gamePattern[i]);
            i++;
            if(i < gamePattern.length) {
                playLoop();
            }
        }, 1000)
    }
    playLoop(); //loop call
}

// animation for playing patterns back to user 
function playBack(color) {
    $("." + color).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// animation to make buttons flash and play sound when clicked;
function buttonClicked(color) {
    $("." + color).addClass("pressed");
    setTimeout(() => {$("." + color).removeClass("pressed"); }, 100);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// call button animation + sound on clicked button
$(".btn").click(function() {
    buttonClicked(this.classList[1]);
});

// start game or restart
$(document).keydown(function (event) {
// only start game if current session is inactive
    if(!active && !isGameOver) {
        if (event.key == 'a') {
            active = true;
            playGame();
        }
    }
    // restart gamea
    else if (!active && isGameOver) {
        level = 0;
        active = true;
        isGameOver = false;
        playGame();
    }
});


// update title
function updateTitleLevel () {
    $("#level-title").text("Level " + ++level);
}


//play game
function playGame() {
    updateTitleLevel();
    nextSequence();
    setTimeout(function () { buttonPlayBack(); }, 500);
}

//verify user's input
var move = 0;
$(".btn").click(function () {
    if(active && !isGameOver) {
        if (this.classList[1] == gamePattern[move]) {
            move++;
            if (move == gamePattern.length)
            {
                move = 0;
                playGame();
            }
        }
        else {
            move = 0;
            gameOver();
        }
    }
    else gameOverAnimation();
});

// gameover
function gameOver() {
    // reset parameters
    gamePattern = [];
    active = false;
    isGameOver = true;
    gameOverAnimation();
}


//Game Over animation
function gameOverAnimation() {
    $("#level-title").text("Game Over! Press Any Key to Restart.")
    $("body").addClass("game-over");
    setTimeout(() => {$("body").removeClass("game-over"); }, 500);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
} 
