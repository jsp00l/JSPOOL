//Draw.js
var ADO = []; //All drawable objects.

const DRAW = () => {

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "green";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    drawLine(b1.x, b1.y, linePoint2.x, linePoint2.y, 2);
    for (obj of ADO) {

        obj.draw();
        obj.x += obj.speed.x;
        obj.y += obj.speed.y;
        obj.speed.x *= 0.985;
        obj.speed.y *= 0.985;
        if (Math.abs(obj.speed.x) < 0.25 && Math.abs(obj.speed.y) < 0.25) {
            obj.speed.x = 0;
            obj.speed.y = 0;
        }
        /*if (Math.abs(obj.speed.y) < 0.25) {
            obj.speed.y = 0;
        }*/
        if (obj.x >= CANVAS.width - 25) {
            obj.speed.x = -obj.speed.x;
            obj.x -= 1;
        }
        if (obj.x <= 0 + 25) {
            obj.speed.x = -obj.speed.x;
            obj.x += 1;
        }
        if (obj.y >= CANVAS.height - 25) {
            obj.speed.y = -obj.speed.y;
            obj.y -= 1;
        }
        if (obj.y <= 0 + 25) {
            obj.speed.y = -obj.speed.y;
            obj.y += 1;
        }
        for (otherObj of ADO) {
            if (obj === otherObj) continue;
            let distance = (obj.x - otherObj.x) * (obj.x - otherObj.x) +
                (obj.y - otherObj.y) * (obj.y - otherObj.y);
            distance = Math.sqrt(distance);

            if (distance <= 49) {

                let inside = 50 - distance;
                let sign;
                if (obj.speed.x > 0) {
                    signX = 1;
                } else {
                    signX = -1;
                }
                if (obj.speed.y > 0) {
                    signY = 1;
                } else {
                    signY = -1;
                }
                if (otherObj.speed.x > 0) {
                    otherSignX = 1;
                } else {
                    otherSignX = -1;
                }
                if (otherObj.speed.y > 0) {
                    otherSignY = 1;
                } else {
                    otherSignY = -1;
                }
                if (inside > 0) {
                    if (obj.speed.x !== 0) {
                        obj.x += (inside / 2 + 1) * (-signX);
                    }
                    if (obj.speed.y !== 0) {
                        obj.y += (inside / 2 + 1) * (-signY);
                    }
                    if (otherObj.speed.x !== 0) {
                        otherObj.x += (inside / 2 + 1) * (-otherSignX);
                    }
                    if (otherObj.speed.y !== 0) {
                        otherObj.y += (inside / 2 + 1) * (-otherSignY);
                    }
                }

                let tempX = obj.speed.x;
                let tempY = obj.speed.y;
                obj.speed.x = otherObj.speed.x;
                obj.speed.y = otherObj.speed.y;
                otherObj.speed.x = tempX;
                otherObj.speed.y = tempY;



            }
        }
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
b1.speed = new Vector(0, 0)



/*
let b2 = new Ball();
b2.color = COLOR.blue;
b2.x = 200;
b2.y = 50;
b2.radius = 25;
b2.speed = new Vector(0, 0);
*/

for (let i = 0; i < 5; ++i) {
    let b3 = new Ball();
    b3.color = "orange";
    b3.x = 200;
    b3.y = 80 + 60 * i;
    b3.radius = 25;
    b3.speed = new Vector(0, 0);
    ADO.push(b3);
}


let linePoint2 = new Vector(0, 0);
console.log(b1);

ADO.push(b1);

let interval = setInterval(DRAW, 1000 / 60);

CANVAS.addEventListener("mousedown", function getMousePos(evt) {
    var rect = CANVAS.getBoundingClientRect();
    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;
    let speedX = -100 * (b1.x - mouseX) / (b1.x + mouseX);
    let speedY = -100 * (b1.y - mouseY) / (b1.y + mouseY);
    b1.speed = new Vector(speedX, speedY);
});

CANVAS.addEventListener("mousemove", function getMousePos(evt) {
    var rect = CANVAS.getBoundingClientRect();
    console.log("x: ", evt.clientX - rect.left);
    console.log("y: ", evt.clientY - rect.top);
    linePoint2.x = evt.clientX - rect.left;
    linePoint2.y = evt.clientY - rect.top;

});