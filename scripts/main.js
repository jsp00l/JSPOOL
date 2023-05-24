// main js

const CANVAS = document.getElementById("main");
const CTX = CANVAS.getContext("2d");
const ctx = CTX;
const COLOR = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
})

CANVAS.width = 800;
CANVAS.height = 400;
CANVAS.style.position = "absolute";
CANVAS.style.top = 500;

class Point {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function drawCircle(x, y, radius, color = COLOR.red) {
    CTX.beginPath();
    CTX.arc(x, y, radius, 0, 2 * Math.PI);
    CTX.fillStyle = color;
    CTX.fill();
    CTX.stroke();
    CTX.closePath();
}

function drawLine(x1, y1, x2, y2, lineWidth = 1) {
    CTX.beginPath();
    CTX.moveTo(x1, y1);
    CTX.lineTo(x2, y2);
    CTX.lineWidth = lineWidth;
    CTX.stroke();
}

function drawCircleFromPoint(point, radius, color = COLOR.red) {
    drawCircle(point.x, point.y, radius, color);
}

function drawLineFromPoints(point1, point2, lineWidth = 1) {
    drawLine(point1.x, point1.y, point2.x, point2.y, lineWidth);
}







drawCircle(50, 50, 25, COLOR.green);


drawLine(50, 50, 200, 200, 5);
