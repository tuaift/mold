function Shadow(cx, cy, r) {
  var dia = 0

  var x = cx + distance * cos(angle);
  var y = cy + distance * sin(angle);

  this.pos = createVector(x, y);
  this.reached = false;

  this.show = function() {
    fill(255);
    noStroke();
    ellipseMode(CENTER);

    ellipse(this.pos.x, this.pos.y, dia);
    if (dia > r) {
      grow = false
    }
    if (dia < 0) {
      grow = true
    }

    if (grow == true) {
      dia += 1
    } else {
      dia -= 1
    }
  }
}
