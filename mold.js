// var tree;
// var max_dist = 500;
// var min_dist = 5;
//
// // function setup() {
// //   createCanvas(windowWidth, windowHeight);
// //   background(0);
// //   for (var i = 0; i < 5; i++) {
// //     cx = random(0, windowWidth);
// //     cy = random(0, windowHeight);
// //     tree = new Tree(cx, cy);
// //   }
// // }
//
//
// function draw() {
//   tree.show();
//   tree.grow();
// }

let bg;
let img_small;
let myFont;

var trees = []; // Array to store multiple trees
var shadows = [];
let random_points_coords = [];
var max_dist = 100;
var min_dist = 10;
let button2016, button2020, button2021;
let hoveredTree = null;

let placeholder_txt_1;
let placeholder_txt_2;

function preload() {
  bg = loadImage('waste_bg.jpg');
  img_small = loadImage('musor.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ParseJson(2016);

  button2016 = createButton('2016');
  button2016.style('font-size', '14px');
  button2016.style('background-color', 'transparent');
  button2016.style('color', '#fff');
  button2016.style('border-style', 'none');
  button2016.style('font-family', 'Roboto Mono');
  button2016.position(width/2 - 100, height - 50);
  button2016.mousePressed(selectYear);

  button2020 = createButton('2020');
  button2020.style('font-size', '14px');
  button2020.style('background-color', 'transparent');
  button2020.style('color', '#fff');
  button2020.style('border-style', 'none');
  button2020.style('font-family', 'Roboto Mono');
  button2020.position(width/2, height - 50);
  button2020.mousePressed(selectYear);

  button2021 = createButton('2021');
  button2021.style('font-size', '14px');
  button2021.style('background-color', 'transparent');
  button2021.style('color', '#fff');
  button2021.style('border-style', 'none');
  button2021.style('font-family', 'Roboto Mono');
  button2021.position(width/2 + 100, height - 50);
  button2021.mousePressed(selectYear);

  for (let i = 0; i < 30; i++) {
    let x = random(0, windowWidth);
    let y = random(100, windowHeight-200);
    random_points_coords.push({ x, y });
  }


//  for (var i = 0; i < 34; i++) {
//    var cx = random(0, windowWidth);
//    var cy = random(0, windowHeight);
//    var r = random(10, 200);
//    var tree = new Tree(cx, cy, r); // Create a new tree instance for each position
    // var blob = new Blob(cx, cy, r);
//    trees.push(tree); // Add the tree to the array
//  }

}

function mouseMoved() {
  checkHover();
}

function tree_create(yearValues) {
  // clear()
  console.log(yearValues);
  for (var country in yearValues) {
    //Create waste size variable
    var radius_scale = 7;
    var scaled_waste_size = yearValues[country] * radius_scale;
    var name = 0;
    var cx = random(0, windowWidth);
    var cy = random(100, windowHeight-200);
    var r = random(10, 200);
    var tree = new Tree(cx, cy, yearValues[country], scaled_waste_size, country); // Create a new tree instance for each position
    // var blob = new Blob(cx, cy, r);
    trees.push(tree); // Add the tree to the array
  }
}

function draw() {
  background(bg); // Clear the background on each frame
  image(img_small, width - 228, 0, 228, 145);
  DrawPoints();

  fill(255);
  textFont("Roboto Mono");
  noStroke();
  textSize(14);
  text("World: 13.3%", 20, 30);
  text("Region: " + placeholder_txt_1, 20, 50);
  text("Waste: " + placeholder_txt_1, 20, 70);
  text("Planet", width/2, height - 180);
  push();
  textAlign(CENTER);
  text("Of The Waste", width/2 + 25, height - 155);
  pop();

  stroke(255);
  strokeWeight(2);
  line(width/2 - 78, height - 100, width/2 + 124, height - 100);
  line(width/2 - 78, height - 120, width/2 - 78, height - 80);
  line(width/2 + 124, height - 120, width/2 + 124, height - 80);
  line(width/2 + 24, height - 120, width/2 + 24, height - 80);


  for (var i = 0; i < trees.length; i++) {
    var tree = trees[i];
    tree.grow();
    tree.show();
  }
  if (hoveredTree) {
    fill(255);
    textSize(14);
    noStroke();
    textAlign(LEFT, LEFT);
    placeholder_txt_1 = '';
    placeholder_txt_2 = '';
    text(" " + hoveredTree.name, 78, 50); // Display the name above the mouse
    text(" " + hoveredTree.waste + "%", 68, 70);
  } else {
      placeholder_txt_1 = '--';
      placeholder_txt_2 = '--';
  }
}

function checkHover() {
  // Check if the mouse is over any tree
  for (let i = 0; i < trees.length; i++) {
    let tree = trees[i];
    let d = dist(mouseX, mouseY, tree.branches[0].pos.x, tree.branches[0].pos.y);
    if (d < tree.branches[0].len) {
      hoveredTree = tree; // Set hoveredTree to the tree the mouse is over
      return; // Exit the loop once a tree is found
    }
  }
  // If the mouse is not over any tree, set hoveredTree to null
  hoveredTree = null;
}

function DrawPoints() {
  for (let i = 0; i < random_points_coords.length; i++) {
    let coords = random_points_coords[i];
    ellipse(coords.x, coords.y, 8, 8);
  }
}

function selectYear() {
  background(0);
  trees = [];
  let selectedYear = this.elt.innerText;
  ParseJson(selectedYear);
}
