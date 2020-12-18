let video;
let poseNet;
let pose;

function setup() {
  createCanvas(640, 400);
  video=createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);
}
function modelLoaded(){
  console.log('poseNet ready');
}

function gotPoses(poses){
  //console.log(poses);
  if(poses.length>0){
    pose=poses[0].pose;
  }
}
function draw() {
  background(220);
  image(video,0,0);
  if(pose){
    fill(255,0,0);
    ellipse(pose.nose.x,pose.nose.y,20);
    fill(0,0,255);
    ellipse(pose.leftWrist.x,pose.leftWrist.y,20);
    ellipse(pose.rightWrist.x,pose.rightWrist.y,20);
  }
  
  
}
