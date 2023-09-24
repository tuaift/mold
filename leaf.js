// function Leaf() {
//   this.pos = createVector(random(width), random(height));
//   this.reached = false;
//
//   this.show = function() {
//     fill(255);
//     noStroke();
//     ellipse(this.pos.x, this.pos.y, 4, 4);
//   }
//
// }

// function Leaf() {
//   // Calculate a random angle within the circle
//   var angle = random(TWO_PI);
//   // Calculate the corresponding (x, y) coordinates based on the angle and radius
//   var x = width / 2 + 300 * cos(angle);
//   var y = height / 2 + 300 * sin(angle);
//
//   this.pos = createVector(x, y);
//   this.reached = false;
//
//   this.show = function() {
//     fill(255);
//     noStroke();
//     ellipse(this.pos.x, this.pos.y, 4, 4);
//   }
// }

function Leaf(cx, cy, r) {
  // Generate a random distance within the specified range
  var distance = random(0, r); //здесь управляем размером плесени, 200 норм
  // Calculate a random angle within the circle
  var angle = random(TWO_PI);
  // Calculate the corresponding (x, y) coordinates based on the angle and distance
  var x = cx + distance * cos(angle);
  var y = cy + distance * sin(angle);

  this.pos = createVector(x, y);
  this.reached = false;

  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}
