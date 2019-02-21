let orange, yellow, red, blue, white, purple, green;

var posLengths = [];
var posWidths = [];
var posHeights = [];
var posObjects = [];

var negLengths = [];
var negWidths = [];
var negHeights = [];
var negObjects = [];

var circleLengths = [];
var circleWidths = [];
var circleHeights = [];
var circleObjects = [];

var lineObjects = [];


function getRandomPointProperties(lengthArray, widthArray, heightArray) {
  for (var i = 0; i < random(60, 180); i++) {
    lengthArray.push(random(4, 16));
    widthArray.push(random(20, windowWidth-20));
    heightArray.push(random(20, windowHeight-20));
  }
}

class Point{
    constructor(type, length, startX, startY){
        this.type = type;
        this.length = length;
        this.startX = startX;
        this.startY = startY;
    }

    display(){
        noStroke();
        fill(orange);

        if (this.type == "+") {
          rect(this.startX, this.startY, this.length, 0.2 * this.length);
          rect(this.startX, this.startY, 0.2 * this.length, this.length);
        } else {
          rect(this.startX, this.startY, this.length, 0.2 * this.length);
        }
    }

    move(){
      this.startX = this.startX += random(0, 2);
      this.startY = this.startY += random(0, 2);
      this.startX = this.startX -= random(0, 2);
      this.startY = this.startY -= random(0, 2);
    }
}


// function countLabel(widthArray, heightArray, centerX, centerY, radius) {
//   var count = 0;
//
//   for (var i = 0; i < widthArray.length; i++) {
//     var d = dist(widthArray[i], heightArray[i], centerX, centerY);
//     if (d < radius) {
//       count ++;
//     }
//   }
//
//   return count;
// }

function countLabel(objectArray, centerX, centerY, radius) {
  var count = 0;

  for (var i = 0; i < objectArray.length; i++) {
    var d = dist(objectArray[i].startX, objectArray[i].startY, centerX, centerY);
    if (d < radius) {
      count ++;
    }
  }

  return count;
}

class Circle{
    constructor(radius, startX, startY){
        this.radius = radius;
        this.startX = startX;
        this.startY = startY;

        // var posCount = countLabel(posWidths, posHeights, this.startX, this.startY, this.radius);
        // var negCount = countLabel(negWidths, negHeights, this.startX, this.startY, this.radius);

        var posCount = countLabel(posObjects, this.startX, this.startY, this.radius);
        var negCount = countLabel(negObjects, this.startX, this.startY, this.radius);

        // red = color(241,12,73, random(20, 200));
        // blue = color(51,145,148,random(20, 200));
        // green = color(138,155,15, random(20, 200));

        red = color(241,12,73, 80);
        blue = color(51,145,148, 80);
        green = color(138,155,15, 80);

        if (posCount > negCount) {
          this.colour = red;
        } else if (posCount < negCount) {
          this.colour= blue;
        } else if (posCount == negCount){
          this.colour = green;
        }
    }

    display(){
        fill(this.colour);
        ellipse(this.startX, this.startY,this.radius,this.radius);
    }

    move(){
      if (this.radius >=  windowWidth/8) {
        this.radius = random(2, windowWidth/8);
      }

      this.radius = this.radius -= random(0, 4);
      this.radius = this.radius += random(0, 4);
      this.startY = this.startY -= random(0, 4);
      this.startY = this.startY += random(0, 4);
      this.startX = this.startX -= random(0, 4);
      this.startX = this.startX += random(0, 4);

      // var posCount = countLabel(posWidths, posHeights, this.startX, this.startY, this.radius);
      // var negCount = countLabel(negWidths, negHeights, this.startX, this.startY, this.radius);

      var posCount = countLabel(posObjects, this.startX, this.startY, this.radius);
      var negCount = countLabel(negObjects, this.startX, this.startY, this.radius);

      red = color(241,12,73, 80);
      blue = color(51,145,148, 80);
      green = color(138,155,15, 80);

      if (posCount > negCount) {
        this.colour = red;
      } else if (posCount < negCount) {
        this.colour= blue;
      } else if (posCount == negCount){
        this.colour = green;
      }
    }
}

function createPoints(type, lengthArray, widthArray, heightArray, objectArray) {
  for (var i = 0; i < lengthArray.length; i++) {
    var newPoint = new Point(type, lengthArray[i], widthArray[i], heightArray[i]);
    objectArray.push(newPoint);
  }
}

function showObject(objectArray) {
  for (var i = 0; i < objectArray.length; i++) {
    objectArray[i].display();
    objectArray[i].move();
  }
}

function setup() {
  orange = color(251,107,65);
  yellow = color(246,216,107);

  ellipseMode(RADIUS);
  rectMode(RADIUS);

  createCanvas(windowWidth, windowHeight);

  getRandomPointProperties(posLengths, posWidths, posHeights);
  getRandomPointProperties(negLengths, negWidths, negHeights);
  createPoints("+", posLengths, posWidths, posHeights, posObjects);
  createPoints("-", negLengths, negWidths, negHeights, negObjects);
}

function draw() {
  background(yellow);
  push();
  // rotate(radians(frameCount));s
  drawGrid();
  pop();

  showObject(posObjects);
  showObject(negObjects);

  push();
  if (frameCount % 25 == 0) {
    var randNum = round(random(0, 3));

    if (randNum == 0) {
      var lineProperties = [0, random(0, windowHeight), random(0, windowWidth), windowHeight];
    } else if (randNum == 1) {
      var lineProperties = [0, random(0, windowHeight), windowWidth, random(0, windowWidth)];
    } else if (randNum == 2) {
      var lineProperties = [random(0, windowWidth), 0, random(0, windowWidth), windowHeight];
    } else if (randNum == 3) {
      var lineProperties = [random(0, windowWidth), 0, windowWidth, random(0, windowHeight)];
    }

    lineObjects.push(lineProperties);
  }

  for (var i = 0; i < lineObjects.length; i++) {

    if (i == lineObjects.length - 1) {
      stroke(255,255,255);
    } else {
      stroke(255,255,255,100);
    }

    line(lineObjects[i][0], lineObjects[i][1], lineObjects[i][2], lineObjects[i][3]);
  }
  pop();

  showObject(circleObjects);

}


function mousePressed(){
    let newCircle = new Circle(random(2, windowWidth/10), mouseX, mouseY);
    circleObjects.push(newCircle);
}

function drawGrid() {
	stroke(251,107,65, 80);
	fill(120);
	for (var x=-width; x < width; x+=5) {
		line(x, -height, x, height);
	}
	for (var y=-height; y < height; y+=5) {
		line(-width, y, width, y);
	}
}
