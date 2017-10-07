var canvas = document.getElementById('canvas');
var body = document.getElementById('body');
var coords = document.getElementById('coords');
var domPoints = document.getElementById('points');


body.addEventListener('keydown',keyDirection,true);

// canvas.onkeydown = moveIt();
var context = canvas.getContext("2d");
context.fillStyle = "skyblue";
context.strokeStyle = "gray";
context.lineWidth = 3;

var snake = {
    x: 50,
    y: 50,
   radius: 10
}
var dot = {
    x: 100,
    y: 100,
    radius: 10,
}

var dot2 = {
    x: 400,
    y: 400,
    radius: 10,
}


var circles =[];

circles.push(snake);
circles.push(dot);
circles.push(dot2);

var dir = 'd';

var frameCount = 0;
var points = 0;

function right(){ circles[0].x += 1;}
function left(){ circles[0].x -= 1;}
function up(){ circles[0].y -= 1;}
function down(){ circles[0].y += 1;}
function direction(){ 
if (dir == 'd'){down();}
if (dir == 'u'){up();}
if (dir == 'l'){left();}
if (dir == 'r'){right();}
}

animate();

function animate() {
    var x = circles[0].x;
    var y = circles[0].y;
    if (frameCount < 9000) {
        requestAnimationFrame(animate);
    }

    if(x > 395 && x < 405  && y > 395 && y < 405){points ++;}
    // if(x == 500 || x == 0 || y == 500 || 0 == 0){circles[0].x = 0;}

    direction();
    circles[1].x +=1;

    draw();
    frameCount++;
    coords.innerHTML = 'X = '+ x + ' Y = ' + y;
    domPoints.innerHTML = points;

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
function keyDirection(e){
    if (e.key=='a'){//left
        console.log("left key pressed");
        dir = "l";
    }
    if (e.key=='d'){//right
        console.log("right key pressed");
        dir = "r";
    }
    if (e.key=='w'){//up
        console.log("up key pressed");
        dir = "u";
    }
    if (e.key=='s'){//down
        console.log("down key pressed");
        dir = "d";
    }
}






