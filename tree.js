function Tree(cx, cy, waste_size, scaled_waste_size, name) {
  this.leaves = [];
  this.blobs = [];
  this.branches = [];
  this.name = name;
  this.waste = waste_size;

  for (var i = 0; i < 500; i++) {
    this.leaves.push(new Leaf(cx, cy, scaled_waste_size));
  }
  var pos = createVector(cx, cy); //задает корень
  var dir = createVector(0, -1);
  var root = new Branch(null, pos, dir)
  // var root = new Branch(null, pos, dir, treeId); //new
  this.branches.push(root);
  var current = root;
  var found = false;
  while (!found) {
    for (var i = 0; i < this.leaves.length; i++) {
      var d = p5.Vector.dist(current.pos, this.leaves[i].pos);

//Нужно куда-то вставить этот кусок
//      let blob = new Blob(cx, cy, d);
//      this.blobs.push(blob);
//
      if (d < max_dist) {
        found = true;
      }
    }
    if (!found) {

      var branch = current.next();
      current = branch;
      this.branches.push(current);
    }
  }

  this.grow = function() {
    for (var i = 0; i < this.leaves.length; i++) {
      var leaf = this.leaves[i];
      var closestBranch = null;
      var record = max_dist;
      for (var j = 0; j < this.branches.length; j++) {
        var branch = this.branches[j];
        // if (branch.treeId !== this.treeId) continue; //new
        var d = p5.Vector.dist(leaf.pos, branch.pos);
        if (d < min_dist) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (d < record) {
          closestBranch = branch;
          record = d;
        }
      }

      if (closestBranch != null) {
        var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;
      }
    }

    for (var i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }

    for (var i = this.branches.length - 1; i >= 0; i--) {
      var branch = this.branches[i];
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1);
        this.branches.push(branch.next());
        branch.reset();
      }
    }
  }

  this.show = function() {
    // for (var i = 0; i < this.leaves.length; i++) {
    //   this.leaves[i].show();
    // }

    for (var i = 0; i < this.branches.length; i++) {
      this.branches[i].show();
      // this.blobs[i].show();
    }
  }

}
