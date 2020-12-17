var scl = 20;
var s;
var food;

function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw() {
    background(51);
    s.death();
    s.update();
    s.show();
    if (s.eat(food)) {
        pickLocation();
    }

    fill(random(255), random(255), random(255));
    rect(food.x, food.y, scl);
    fill(200);
    text('Máximo Puntaje:' + str(s.score), 5, 5, 100);
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