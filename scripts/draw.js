//Draw.js
var ADO = []; //All drawable objects.

const DRAW = () => {

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "green";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    drawLine(b1.x, b1.y, linePoint2.x, linePoint2.y, 2);
    drawCircle(0, 0, 40, "black");
    drawCircle(0, CANVAS.height, 40, "black");
    drawCircle(CANVAS.width, 0, 40, "black");
    drawCircle(CANVAS.width, CANVAS.height, 40, "black");



    for (obj of ADO) {

        obj.draw();

    }
}

class Drawable {
    x = 42;
    y = 0;
    constructor() {
        if (new.target === Drawable) {
            throw new TypeError("Cannot construct Drawable instances directly!");
        }
    }
    draw() {
        console.log("in draw");
    }
}

class Ball extends Drawable {
    speed = new Vector(15, -30);
    radius = 0;
    mass = 0;
    color = COLOR.blue;
    radius = 10;
    mass = 10;
    constructor(x, y, radius, color) {
        super();

    }

    draw() {
        let gradient = ctx.createRadialGradient(this.x - 10, this.y - 10, this.radius / 20
            , this.x, this.y, this.radius);

        gradient.addColorStop(0, '#E0D5D5');
        gradient.addColorStop(0.9, this.color);
        gradient.addColorStop(1, this.color);


        drawCircle(this.x, this.y, this.radius, gradient);

    }
}

let b1 = new Ball();
b1.color = COLOR.red;
b1.x = 50;
b1.y = 50;
b1.radius = 25;
b1.speed = new Vector(0, 0);



/*
let b2 = new Ball();
b2.color = COLOR.blue;
b2.x = 200;
b2.y = 50;
b2.radius = 25;
b2.speed = new Vector(0, 0);
*/

let colorForCreation = ["orange", "green", "blue", "yellow", "purple"];

for (let i = 0; i < 5; ++i) {
    let b3 = new Ball();
    b3.color = colorForCreation[i];
    b3.mass = i * 10 + 10;
    b3.x = 200;
    b3.y = 80 + 60 * i;
    b3.radius = 25;
    b3.speed = new Vector(0, 0);
    ADO.push(b3);
}


let b4 = new Ball();
b4.color = "black";
b4.mass = 200;
b4.x = 600;
b4.y = 200;
b4.radius = 25;
b4.speed = new Vector(0, 0);
ADO.push(b4);


let linePoint2 = new Vector(0, 0);
console.log(b1);
b1.mass = 30;
ADO.push(b1);

let interval = setInterval(DRAW, 1000 / 60);

CANVAS.addEventListener("mousedown", function getMousePos(evt) {
    var rect = CANVAS.getBoundingClientRect();
    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;




    let vectorToMouse = new Vector(mouseX - b1.x, mouseY - b1.y);
    vectorToMouse = vectorToMouse.unit();

    let distanceFromMouse = Math.sqrt(Math.pow(mouseX - b1.x, 2)
        + Math.pow(mouseY - b1.y, 2));

    let testSpeed = 100 * (distanceFromMouse / 800)

    /*
    let speedX = -100 * (b1.x - mouseX) / (b1.x + mouseX);
    let speedY = -100 * (b1.y - mouseY) / (b1.y + mouseY);
    let xSign = speedX < 0 ? -1 : 1;
    let ySign = speedY < 0 ? -1 : 1;
    */


    vectorToMouse = vectorToMouse.mul(new Vector(testSpeed, testSpeed));


    b1.speed = vectorToMouse;
});

CANVAS.addEventListener("mousemove", function getMousePos(evt) {
    var rect = CANVAS.getBoundingClientRect();

    linePoint2.x = evt.clientX - rect.left;
    linePoint2.y = evt.clientY - rect.top;

});

var collisionOccured = false;
const tick = () => {

    for (obj of ADO) {
        obj.x += obj.speed.x * 1 / 5;
        obj.y += obj.speed.y * 1 / 5;
        obj.speed.x *= 0.99;
        obj.speed.y *= 0.99;
        if (Math.abs(obj.speed.x) < 0.25 && Math.abs(obj.speed.y) < 0.25) {
            obj.speed.x = 0;
            obj.speed.y = 0;
        }
        /*if (Math.abs(obj.speed.y) < 0.25) {
            obj.speed.y = 0;
        }*/
        if (obj.x >= CANVAS.width - 25 && obj.y >= 40 && obj.y <= CANVAS.height - 40) {
            obj.speed.x = -obj.speed.x;
            obj.x -= 1;
        }
        if (obj.x <= 0 + 25 && obj.y >= 40 && obj.y <= CANVAS.height - 40) {
            obj.speed.x = -obj.speed.x;
            obj.x += 1;
        }
        if (obj.y >= CANVAS.height - 25 && obj.x >= 40 && obj.x <= CANVAS.width - 40) {
            obj.speed.y = -obj.speed.y;
            obj.y -= 1;
        }
        if (obj.y <= 0 + 25 && obj.x >= 40 && obj.x <= CANVAS.width - 40) {
            obj.speed.y = -obj.speed.y;
            obj.y += 1;
        }

        for (otherObj of ADO) {
            if (obj === otherObj) continue;
            let distance = (obj.x - otherObj.x) * (obj.x - otherObj.x) +
                (obj.y - otherObj.y) * (obj.y - otherObj.y);
            distance = Math.sqrt(distance);

            if (distance <= 50) {





                let normalObj = new Vector(otherObj.x - obj.x, otherObj.y - obj.y);

                const mtd = normalObj.mulScalar((50 - distance) / distance);



                obj.x -= Math.ceil(mtd.mulScalar(1 / 2).x * 2);
                obj.y -= Math.ceil(mtd.mulScalar(1 / 2).y * 2);

                otherObj.x += Math.ceil(mtd.mulScalar(1 / 2).x * 2);
                otherObj.y += Math.ceil(mtd.mulScalar(1 / 2).y * 2);





                let unitNormalObjs = normalObj.unit();
                let unitTangentNormalObjs = new Vector(-unitNormalObjs.y, unitNormalObjs.x);


                const v1n = unitNormalObjs.dot(obj.speed);
                const v1t = unitTangentNormalObjs.dot(obj.speed);
                const v2n = unitNormalObjs.dot(otherObj.speed);
                const v2t = unitTangentNormalObjs.dot(otherObj.speed);

                let m1 = obj.mass;
                let m2 = otherObj.mass;

                let v_1n = (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2);
                let v_2n = (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2);


                let V_1n = unitNormalObjs.mulScalar(v_1n);
                let V_1t = unitTangentNormalObjs.mulScalar(v1t);

                let V_2n = unitNormalObjs.mulScalar(v_2n);
                let V_2t = unitTangentNormalObjs.mulScalar(v2t);


                obj.speed = V_1n.add(V_1t);
                otherObj.speed = V_2n.add(V_2t);

            }
        }
    }
}
var interval2 = setInterval(tick, 1000 / 60);

