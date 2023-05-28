// main js
const PI = Math.PI;
const CANVAS = document.getElementById("main");
const CTX = CANVAS.getContext("2d");
const ctx = CTX;
const COLOR = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});
const RED = "red";

const LOG = (x) => console.log(x);
const ERROR = (x) => console.error(x);
const WARN = (x) => console.warn(x);





class Vector {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }
    sub(otherVector) {
        return new Vector(this.x - otherVector.x, this.y - otherVector.y);
    }
    mul(otherVector) {
        return new Vector(this.x * otherVector.x, this.y * otherVector.y);
    }
    mulScalar(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    div(otherVector) {
        return new Vector(this.x / otherVector.x, this.y / otherVector.y);
    }
    divScalar(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    unit() {
        let u = new Vector(this.x, this.y);
        u = u.divScalar(u.length());
        return u;
    }
    dot(otherVector) {
        let u = new Vector(this.x, this.y);
        return u.x * otherVector.x + u.y + otherVector.y;
    }
}




class Point {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;
    constructor(point1, point2) {
        this.x1 = point1.x;
        this.y1 = point1.y;
        this.x2 = point2.x;
        this.y2 = point2.y;
    }
}

function drawCircle(x, y, radius, color = COLOR.red) {
    CTX.beginPath();
    CTX.arc(x, y, radius, 0, 2 * PI);
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


drawLine(50, 50, 200, 200, 5);



let x = 50;
let y = 50;
//let speed = 25;

let mouseX = 0;
let mouseY = 0;
/*
function nextTick() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "green";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    drawCircle(x += speed, 50, 25, COLOR.green);

    speed = speed * 0.99;

    if (Math.abs(speed) < 0.25) {
        speed = 0;
    }

    if (x >= CANVAS.width - 25) {
        speed = -speed;
    }
    if (x <= 0 + 25) {
        speed = -speed;
    }
    drawLine(x, 50, mouseX, mouseY, 2);
}

let interval = setInterval(nextTick, 1000 / 144);


CANVAS.addEventListener("mousemove", function getMousePos(evt) {
    var rect = CANVAS.getBoundingClientRect();
    console.log("x: ", evt.clientX - rect.left);
    console.log("y: ", evt.clientY - rect.top);
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
});
*/