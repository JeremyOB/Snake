var canvas = document.getElementById('canvas');
var body = document.getElementById('body');
var coords = document.getElementById('coords');
var domPoints = document.getElementById('points');
var time = document.getElementById('time');
canvas.setAttribute('tabindex', '1');

body.addEventListener('keydown', keyDirection, true);

var context = canvas.getContext("2d");
context.fillStyle = "skyblue";
context.strokeStyle = "gray";
context.lineWidth = 3;

var dot = {
    x: 400,
    y: 400,
    radius: 10,
}

var snake = {
    x: 50,
    y: 50,
    radius: 10
}

var snake2 = {
    x: 40,
    y: 50,
    radius: 10

}

var snake3 = {
    x: 40,
    y: 50,
    radius: 10

}



var circles = [];

circles.push(dot);
circles.push(snake);
circles.push(snake2);
circles.push(snake3);



var dir = 'd';
var gameOver = false;
var frameCount = 0;
var points = 0;
var th = 20;
var his = [];


function update() {
    var snakeX = circles[2].x;
    var snakeY = circles[2].y;
    his.push([snakeX,snakeY]);
    var i = 2;
    var space = 20;
    var HistLength = his.length;
    console.log(his[HistLength]);
    console.log(his);

    while (i < circles.length) {
        if (HistLength < 20){
            
        }
        else{
            circles[i].x = his[HistLength];
            circles[i].y = his[HistLength+20];
        }
       
        i++
    }
    switch (dir) {
        case 'd':
            circles[1].y += 2;
            break;
        case 'u':
            circles[1].y -= 2;
            break;
        case 'l':
            circles[1].x -= 2;
            break;
        case 'r':
            circles[1].x += 2;
            break;
    }

}



function readyPlayerOne() {
    var t1 = performance.now();
    hitSide();
    hitDot();
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
    if (e.key == 'a') { //left
        console.log("left key pressed");
        dir = "l";
    }
    if (e.key == 'd') { //right
        console.log("right key pressed");
        dir = "r";
    }
    if (e.key == 'w') { //up
        console.log("up key pressed");
        dir = "u";
    }
    if (e.key == 's') { //down
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

function hitDot() {
    if (circles[1].x > circles[0].x - th &&
        circles[1].x < circles[0].x + th &&
        circles[1].y > circles[0].y - th &&
        circles[1].y < circles[0].y + th) {
        points++;
        moveDot();
    }
}

function hitSide() {
    if (circles[1].x > 490 ||
        circles[1].x < 10 ||
        circles[1].y > 490 ||
        circles[1].y < 10) {
        gameOver = true;
    }
}

function fps(t1){
    if (frameCount % 10 === 0){
        var t2 = performance.now();
        var frameTime = roundToTwo(t2-t1);
        var runTime = roundToTwo((t2-startTime)/1000);
        var fps = roundToTwo(frameCount/runTime);
time.innerHTML =  "Run time = " + runTime + "<br> Frame time ms = " + frameTime + "<br> fps = " + fps;

    }
}


function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
const startTime = performance.now();
readyPlayerOne();