// main js

const CANVAS = document.getElementById("main");
CANVAS.width = 800;
CANVAS.height = 400;
CANVAS.style.position = "absolute";
CANVAS.style.top = 500;
var CTX = CANVAS.getContext("2d");

const Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
})

function drawCircle(x, y, radius, color = Color.red) {
    CTX.beginPath();
    CTX.arc(100, 75, 50, 0, 2 * Math.PI);
    CTX.fillStyle = color;
    CTX.fill();
    CTX.stroke();
    CTX.closePath();
}




drawCircle(50, 50, 100, Color.red);



