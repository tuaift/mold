function Blob(cx, cy, r) {
  this.show = function() {
    let randomColor = color(random(255), random(255), random(255));
    fill(randomColor); // Set the fill color
    circle(cx, cy, r * 2); // Draw a circle with diameter (2 * radius)
  }
}
