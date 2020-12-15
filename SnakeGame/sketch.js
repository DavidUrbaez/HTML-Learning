var scl = 20;
var s;
var food;

function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    food = createVector(random(width), random(height));
}

function pickLocation() {
    var cols = floot(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
}

function draw() {
    background(51);
    s.update();
    s.show();
    fill(255, 0, 100);
    rect(food.x, food.y, scl);
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1)
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0)
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0)
    }
}