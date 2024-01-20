// alert("JS is working.")

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gameAnimation(randomChosenColor);
    playSound(randomChosenColor);
    level = level + 1;
    $('#level-title').text('Level ' + level);
    gamePattern.push(randomChosenColor);
    console.log(level);
}

function gameAnimation(color) {
        var buttonSelector = '#' + color;
        var soundName = color + 'Sound';
        $(buttonSelector).fadeOut(100).fadeIn(100);
        playSound(color);
}

function playSound(name) {
        var soundSelector = 'sounds/' + name + '.mp3';
        var soundName = new Audio(soundSelector);
        soundName.play();
}

function animatePress(currentColor) {
    var clickedButton = '#' + currentColor;
    $(clickedButton).addClass('pressed');

    setTimeout(function() {
        $(clickedButton).removeClass('pressed');
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    // console.log(userClickedPattern);
    // console.log(gamePattern);
    // console.log(gamePattern[-1]);
    // console.log(currentLevel);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Correct');
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $('body').addClass('game-over');
        playSound('wrong');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart');
        console.log('Wrong');
        startOver();
    }
}

$('div[type="button"]').click(function() {
    // alert('Buttin clicked.');
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    // nextSequence(); this should probably go in checkAnswer()
    // otherwise it calls nextSequence() on every click
    // console.log(userClickedPattern);
})

$(document).keydown(function() {
    if (started == false){
        level = 0;
        $('#level-title').text('Level ' + level);
        nextSequence();
    }
    started = true;
})


// $("#red").click(function() {
//     $("#red").fadeOut(100).fadeIn(100);
//     var redSound = new Audio('sounds/red.mp3');
//     redSound.play();
// })
// $("#blue").click(function() {
//     $("#blue").fadeOut(100).fadeIn(100);
//     var blueSound = new Audio('sounds/blue.mp3');
//     blueSound.play();
// })
// $("#green").click(function() {
//     $("#green").fadeOut(100).fadeIn(100);
//     var greenSound = new Audio('sounds/green.mp3');
//     greenSound.play();
// })
// $("#yellow").click(function() {
//     $("#yellow").fadeOut(100).fadeIn(100);
//     var yellowSound = new Audio('sounds/yellow.mp3');
//     yellowSound.play();
// })