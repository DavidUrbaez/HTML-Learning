let Total;
let force;
let mover;

let video;
let poseNet;
let pose;
let xPosPlayer;
let yPosPlayer;

let rightPoint;
let wrongPoint;

function modelLoaded() {
  console.log('poseNet ready');
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0 && true) {
    pose = poses[0].pose;
  }
  //console.log(pose.rightWrist.confidence);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);

  video.hide();
  xPosPlayer = width / 2;
  yPosPlayer = height / 2;
  mover = new Mover(200, 200);

  // poseNet stuff
  poseNet = ml5.poseNet(video, {
    flipHorizontal: false,
  });
  poseNet.on('pose', gotPoses);


  // Se crean los puntos
  rightPoint = new randomPoint(50, 1);
  wrongPoint = new randomPoint(50, -1);
  Total = 0;

  force = createVector(0, 0.1);
}



function draw() {

  background(0, 0, 20);

  let radiusPlayer = 50;
  translate(video.width, 0);
  scale(-1, 1);
  //tint(255, 255, 255, 100);
  image(video, 0, 0);
  if (pose) {
    xPosPlayer = pose.rightWrist.x;
    yPosPlayer = pose.rightWrist.y;

    if (pose.leftWrist.y < height / 2) {
      force = createVector(0, -0.1);
      print("gravity Up");
    } else {
      force = createVector(0, 0.1);
    }
  }


  // posenetHit
  if (dist(mover.pos.x, mover.pos.y, xPosPlayer, yPosPlayer) <= mover.r + radiusPlayer) {
    //print("hola");
    fill(255, 0, 0);
    newVel = createVector(mover.pos.x - xPosPlayer, mover.pos.y - yPosPlayer);
    newVel.setMag(mover.vel.mag());
    mover.vel = newVel;
  }

  // Points Section
  Total += rightPoint.gotit(mover.pos.x, mover.pos.y);
  Total += wrongPoint.gotit(mover.pos.x, mover.pos.y);
  rightPoint.show(0, 1, 0);
  wrongPoint.show(1, 0, 0);


  mover.applyForce(force);

  mover.update();
  mover.edges();
  mover.show();
  stroke(100, 0, 100);
  fill(255, 0, 255, 100);
  ellipse(xPosPlayer, yPosPlayer, radiusPlayer * 2);
  translate(video.width, 0);
  scale(-1, 1);
  textSize(24);
  text("Puntaje total : " + Total, 0, 0, 200, 100)
  //print(Total);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    force = createVector(0, -0.1);
  } else if (keyCode === DOWN_ARROW) {
    force = createVector(0, 0.1);
  } else if (keyCode === LEFT_ARROW) {
    force = createVector(0.1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    force = createVector(-0.1, 0);
  }
}