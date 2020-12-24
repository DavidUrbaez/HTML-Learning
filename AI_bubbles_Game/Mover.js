class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 1);
    this.vel.mult(random(20));
    this.r=16;
  }


  applyForce(force) {
    this.acc = force;
  }


  edges() {
    if (this.pos.y >= height-this.r) {
      this.pos.y = height-this.r;
      this.vel.y *= -1;
    }
    if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width-this.r) {
      this.pos.x = width-this.r;
      this.vel.x *= -1;
    }
    if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }
  update() {
    // let mouse = createVector(mouseX, mouseY);
    // this.acc = p5.Vector.sub(mouse, this.pos);
    // this.acc.setMag(0.1);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  show() {
    stroke(0, 0, 100);
    strokeWeight(2);
    fill(0,0,250, 100);
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }
}