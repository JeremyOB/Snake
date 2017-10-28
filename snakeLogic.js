//#region DOM Objects 
const canvas = document.getElementById('canvas');
const body = document.getElementById('body');
const coords = document.getElementById('coords');
const domPoints = document.getElementById('points');
const time = document.getElementById('time');
//endregion
//region canvas & event handlers
var context = canvas.getContext("2d");
canvas.setAttribute('tabindex', '1');
body.addEventListener('keydown', keyDirection, true);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
//endregion
//region canvas style
context.fillStyle = 'purple';
context.strokeStyle = "gray";
context.lineWidth = 3;
//endregion
//region touch screen actions 
var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            dir = "l";
        } else {
            /* right swipe */
            dir = "r";
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            dir = "u";
        } else {
            /* down swipe */
            dir = "d";
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
//endregion
//region game variables 
var dot = {
    x: 70,
    y: 70,
    radius: 10,
}

var snake = {
    x: 50,
    y: 50,
    radius: 10
}
var circles = [];

var dir = 'd'; //starting direction
var gameOver = false;
var frameCount = 0;
var points = 0;
var th = 20; //snake edge tolorance for colison detection
const segmentTollerance =8;
var chronicle = []; //lsog/history of snake cords
var snakeLength = 1;
const speed = 3;
//endregion 

function update() {
    var snakeX = circles[1].x;
    var snakeY = circles[1].y;
    chronicle.push([snakeX, snakeY]);
    var space = 6;
    var histLength = chronicle.length;

    for (var index = 2; index < circles.length; index++) {

        if (histLength > 30) {
            circles[index].x = chronicle[histLength - space][0];
            circles[index].y = chronicle[histLength - space][1];
            space += 6;

            if (circles[1].x > circles[index].x - segmentTollerance &&
                circles[1].x < circles[index].x + segmentTollerance &&
                circles[1].y > circles[index].y - segmentTollerance &&
                circles[1].y < circles[index].y + segmentTollerance
                
            ) {
                console.log("index = " + index + "hit self")
                gameOver = true
            }

        }
    }
    switch (dir) {
        case 'd':
        if (dir != 'u') {
            circles[1].y += speed;
        }
            
            break;
        case 'u':
            circles[1].y -= speed;
            break;
        case 'l':
            circles[1].x -= speed;
            break;
        case 'r':
            circles[1].x += speed;
            break;
    }

}

function readyPlayerOne() {
    console.log(dir);
    var t1 = performance.now();
    hitSide();
    eatDot();
    update();
    draw();
    frameCount++;
    coords.innerHTML = 'X = ' + circles[1].x + ' Y = ' + circles[1].y + "<br>" + "X = " + circles[0].x + 'Y = ' + circles[0].y;
    domPoints.innerHTML = points;

    if (gameOver == false) {
        requestAnimationFrame(readyPlayerOne);
    } else {
        alert("game Over!" + startTime);
    }
    fps(t1);
    
  
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        var c = circles[i];
        context.beginPath();
        context.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();
    }
}

function keyDirection(e) {
    if (e.key == 'a'&& dir !== 'r') { //left
        console.log("left key pressed");
        dir = "l";
    }
    if (e.key == 'd'&& dir !== 'l') { //right
        console.log("right key pressed");
        dir = "r";
    }
    if (e.key == 'w'&& dir !== 'd') { //up
        console.log("up key pressed");
        dir = "u";
    }
    if (e.key == 's'&& dir !== 'u') { //down
        console.log("down key pressed");
        dir = "d";
    }
}

function moveDot() {
    circles[0].x = Math.floor((Math.random() * 400) + 1);
    circles[0].y = Math.floor((Math.random() * 400) + 1);
}

function newGame() {
    circles[1].x = 100;
    circles[1].y = 100;
    gameOver = false;
    readyPlayerOne();
}

function eatDot() {
    if (circles[1].x > circles[0].x - th &&
        circles[1].x < circles[0].x + th &&
        circles[1].y > circles[0].y - th &&
        circles[1].y < circles[0].y + th) {
        points ++;
        moveDot();
        addSnakeSegment();
}}

function hitSide() {
    if (circles[1].x > 490 ||
        circles[1].x < 10 ||
        circles[1].y > 490 ||
        circles[1].y < 10) {
        gameOver = true;
    }
}



function fps(t1) {
    if (frameCount % 10 === 0) {
        var t2 = performance.now();
        var frameTime = roundToTwo(t2 - t1);
        var runTime = roundToTwo((t2 - startTime) / 1000);
        var fps = roundToTwo(frameCount / runTime);
        time.innerHTML = "Run time = " + runTime + "<br> Frame time ms = " + frameTime + "<br> fps = " + fps;

    }
}

function addSnakeSegment() {
    var snakeBody = {

        x: 0,
        y: 00,
        radius: 10


    }
    circles.push(snakeBody);

}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

circles.push(dot);
circles.push(snake);
const startTime = performance.now();
readyPlayerOne();