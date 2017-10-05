var canvas = document.getElementById('canvas');
canvas.addEventListener('keydown',moveIt,true);

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
    x: 5,
    y: 5,
    radius: 10,
}

var circles =[];

circles.push(snake);
circles.push(dot);
circles.push(dot2);

var frameCount = 0;

animate();

function animate() {
    if (frameCount < 300) {
        requestAnimationFrame(animate);
    }
    circles[0].x += 1;
    circles[1].y += 1;
    draw();
    frameCount++;
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

function moveIt(e){
    if (e.keycode==35){
        console.log("key 35 pressed");
        a
    }
    function moveIt(e){
        if (e.keycode==36){
            console.log("key 36 pressed");
        }
    }
    function moveIt(e){
        if (e.keycode==37){
            console.log("key 37 pressed");
            alert('d');
        }
    }
    function moveIt(e){
        if (e.keycode==38){
            console.log("key 38 pressed");
        }
    }
}






