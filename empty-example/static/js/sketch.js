var width, height, diameter, offset, ball, ball1;
var speed = 3;
var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?
var dragging1 = false; // Is the object being dragged?
var rollover1 = false; // Is the mouse over the ellipse?
var offsetX, offsetY;    // Mouseclick offset
var offsetX1, offsetY1;    // Mouseclick offset
var dist;
var force;
var distInitial;
var forceInitial;
var theta;
var disableDrag = 0;

function setup() {
  // put setup code here
  width = windowWidth * 0.8;
  height = 400;
  diameter = 30;
  offset = width / 6;
  var canvas = createCanvas(width, height);
  canvas.style('display', 'block');
  canvas.parent('jumbo-canvas')
  ball = new Ball();
  ball1 = new Ball1();
}

function windowResized() {
  resizeCanvas(windowWidth - windowWidth / 2, 400);
  ball.x = width / 2 - offset;
  ball1.x = width / 2 + offset;
}

function draw() {
  // put drawing code 
  background(0, 0, 0);
  line(ball.x, ball.y, ball1.x, ball1.y);
  stroke('#9beb4b');
  strokeWeight(3);

  // Is mouse over object
  if (mouseX > (ball.x - diameter / 2) && mouseX < (ball.x + diameter / 2) &&
    mouseY > (ball.y - diameter / 2) && mouseY < (ball.y + diameter / 2)) {
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (mouseX > (ball1.x - diameter / 2) && mouseX < (ball1.x + diameter / 2) &&
    mouseY > (ball1.y - diameter / 2) && mouseY < (ball1.y + diameter / 2)) {
    rollover1 = true;
  }
  else {
    rollover1 = false;
  }


  // Adjust location if being dragged
  if (dragging) {
    ball.x = mouseX + offsetX;
    ball.y = mouseY + offsetY;
    distanceInitial();
    fcomputeInitial();

    if (ball.x > width) {
      ball.x = width - diameter / 2;
    }
    if (ball.x < 0) {
      ball.x = 0 + diameter / 2;
    }

    if (ball.y > height) {
      ball.y = height - diameter / 2;
    }
    if (ball.y < 0) {
      ball.y = 0 + diameter / 2;
    }
    if (distInitial < diameter + 2) {
      let thetaBall = Math.atan((ball1.y - ball.y) / (ball1.x - ball.x));
      if (ball.x < ball1.x) {
        ball.x = ball1.x - diameter * cos(thetaBall);
        ball.y = ball1.y - diameter * sin(thetaBall);
      }
      else {
        ball.x = ball1.x + diameter * cos(thetaBall);
        ball.y = ball1.y + diameter * sin(thetaBall);
      }
    }
  }

  if (dragging1) {
    ball1.x = mouseX + offsetX1;
    ball1.y = mouseY + offsetY1;
    distanceInitial();
    fcomputeInitial();

    if (ball1.x > width) {
      ball1.x = width - diameter / 2;
    }
    if (ball1.x < 0) {
      ball1.x = 0 + diameter / 2;
    }

    if (ball1.y > height) {
      ball1.y = height - diameter / 2;
    }
    if (ball1.y < 0) {
      ball1.y = 0 + diameter / 2;
    }
    if (distInitial < diameter + 2) {
      let thetaBall = Math.atan((ball1.y - ball.y) / (ball1.x - ball.x));
      if (ball.x > ball1.x) {
        ball1.x = ball.x - diameter * cos(thetaBall);
        ball1.y = ball.y - diameter * sin(thetaBall);
      }
      else {
        ball1.x = ball.x + diameter * cos(thetaBall);
        ball1.y = ball.y + diameter * sin(thetaBall);
      }
    }
  }

  distance();
  fcompute();
  ball.update();
  ball1.update();
  checkWall();
  ball.show();
  ball1.show();
}


function distanceInitial() {
  distInitial = Math.sqrt(Math.pow((ball.x - ball1.x), 2) + Math.pow((ball.y - ball1.y), 2));
  distInitial = distInitial.toFixed(2);
  //document.getElementById("distanceInitial").value = distInitial;
}

function fcomputeInitial() {
  var ctext = int(document.getElementById("demo").innerHTML);
  var ctext1 = int(document.getElementById("demo1").innerHTML);

  forceInitial = (9 * Math.pow(10, 9) * ctext * ctext1 * Math.pow(10, -12)) / Math.pow(distInitial, 2);
  forceInitial = forceInitial.toFixed(6);
  //document.getElementById("forceInitial").value = forceInitial;
}

function distance() {
  dist = Math.sqrt(Math.pow((ball.x - ball1.x), 2) + Math.pow((ball.y - ball1.y), 2));
  dist = dist.toFixed(2);
  document.getElementById("distance").value = dist;
}

function fcompute() {
  var ctext = int(document.getElementById("demo").innerHTML);
  var ctext1 = int(document.getElementById("demo1").innerHTML);

  force = (9 * Math.pow(10, 9) * ctext * ctext1 * Math.pow(10, -12)) / Math.pow(dist, 2);
  force = force.toFixed(6);
  document.getElementById("force").value = force;
}

function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > (ball.x - diameter / 2) && mouseX < (ball.x + diameter / 2) &&
    mouseY > (ball.y - diameter / 2) && mouseY < (ball.y + diameter / 2) && disableDrag == 0) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = ball.x - mouseX;
    offsetY = ball.y - mouseY;
  }

  if (mouseX > (ball1.x - diameter / 2) && mouseX < (ball1.x + diameter / 2) &&
    mouseY > (ball1.y - diameter / 2) && mouseY < (ball1.y + diameter / 2) && disableDrag == 0) {
    dragging1 = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX1 = ball1.x - mouseX;
    offsetY1 = ball1.y - mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
  dragging1 = false;
  distanceInitial();
  fcomputeInitial();
}

function checkWall() {
  if ((ball.x - diameter / 2 <= 0)) {
    ball.xSpeed = 0;
    ball.ySpeed = 0;
  }

  if ((ball1.x - diameter / 2 <= 0)) {
    ball1.xSpeed = 0;
    ball1.ySpeed = 0;
  }

  if ((ball.x + diameter / 2 >= width)) {
    ball.xSpeed = 0;
    ball.ySpeed = 0;
  }

  if ((ball1.x + diameter / 2 >= width)) {
    ball1.xSpeed = 0;
    ball1.ySpeed = 0;
  }

  if (ball.y - diameter / 2 <= 0) {
    ball.xSpeed = 0;
    ball.ySpeed = 0;
  }

  if (ball1.y - diameter / 2 <= 0) {
    ball1.xSpeed = 0;
    ball1.ySpeed = 0;
  }

  if (ball.y + diameter / 2 >= height) {
    ball.xSpeed = 0;
    ball.ySpeed = 0;
  }

  if (ball1.y + diameter / 2 >= height) {
    ball1.xSpeed = 0;
    ball1.ySpeed = 0;
  }

  distance();
  if (dist <= diameter + 3) {
    ball.xSpeed = 0;
    ball.ySpeed = 0;
    ball1.xSpeed = 0;
    ball1.ySpeed = 0;
  }

}

function leq() {

  var ctext = int(document.getElementById("demo").innerHTML);
  var ctext1 = int(document.getElementById("demo1").innerHTML);

  theta = Math.atan((ball1.y - ball.y) / (ball1.x - ball.x));
  disableDrag = 1;

  if ((ctext > 0 && ctext1 < 0) || (ctext < 0 && ctext1 > 0)) {
    if (ball.x <= ball1.x) {
      ball.xSpeed = speed * cos(theta);
      ball.ySpeed = speed * sin(theta);
      ball1.xSpeed = -(speed * cos(theta));
      ball1.ySpeed = -(speed * sin(theta));
    }

    else {
      ball.xSpeed = -(speed * cos(theta));
      ball.ySpeed = -(speed * sin(theta));
      ball1.xSpeed = speed * cos(theta);
      ball1.ySpeed = speed * sin(theta);
    }
  }

  else if (ctext == 0 || ctext1 == 0) {
    ball.xSpeed = 0;
    ball.ySpeed = 0;
    ball1.xSpeed = 0;
    ball1.ySpeed = 0;
  }

  else {
    if (ball.x <= ball1.x) {
      ball.xSpeed = -(speed * cos(theta));
      ball.ySpeed = -(speed * sin(theta));
      ball1.xSpeed = +(speed * cos(theta));
      ball1.ySpeed = +(speed * sin(theta));
    }

    else {
      ball.xSpeed = +(speed * cos(theta));
      ball.ySpeed = +(speed * sin(theta));
      ball1.xSpeed = -(speed * cos(theta));
      ball1.ySpeed = -(speed * sin(theta));
    }
  }
}