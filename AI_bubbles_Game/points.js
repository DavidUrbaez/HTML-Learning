function randomPoint(r, addOrsubPoint) {
  this.radius = r;
  this.value = addOrsubPoint;
  this.pickLoc = function() {
    this.point = createVector(random(video.width), random(video.height / 3, video.height));
  }
  this.show = function(r, g, b) {

    stroke(r * 100, g * 100, b * 100);
    fill(r * 255, g * 255, b * 255, 100);
    ellipse(this.point.x, this.point.y, this.radius);
  }
  this.gotit = function(posX, posY, defRadius = 0) {
    condition = pow(pow(posX - this.point.x, 2) + pow(posY - this.point.y, 2), 1 / 2) <= this.radius + defRadius;
    if (condition) {
      this.pickLoc();
      return addOrsubPoint;
    } else {
      return 0
    }


  }
  this.pickLoc();
}