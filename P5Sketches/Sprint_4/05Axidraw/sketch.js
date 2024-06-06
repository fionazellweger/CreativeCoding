const axi = new axidraw.AxiDraw();
let connected = false;

let posX = 0;
let posY = 0;

let paperWidth = 420;
let paperHeight = 297;

let paddingX = 40;
let paddingY = 40;

let gridSize = 30;

let tiles = 0;

let gridAnzahl;

let xSpalte;
let ySpalte;

let mic;

function preload() {
  font = loadFont("AUTHENTICSans-90.otf");
}

function setup() {
  paperWidth = 420 * 6;
  paperHeight = 297 * 5;
  createCanvas(paperWidth, paperHeight);
  paperWidth = 420;
  gridAnzahl = floor((paperWidth - 2 * paddingX) / gridSize);
  mic = new p5.AudioIn();
  noLoop();
  background(250);
}

function mouseClicked() {
  userStartAudio()
    .then(() => {
      mic.start(() => {
        console.log("Microphone started successfully");
      });
      connectAndDraw();
    })
    .catch((error) => {
      console.error("Error starting audio", error);
    });
}

function keyPressed() {
  userStartAudio()
    .then(() => {
      mic.start(() => {
        console.log("Microphone started successfully");
      });
    })
    .catch((error) => {
      console.error("Error starting audio", error);
    });
}

function connectAndDraw() {
  if (!connected) {
    axi
      .connect()
      .then(() => {
        connected = true;
        drawWithAxi();
        drawCanvasOnly();
        tiles++;
      })
      .catch(() => {
        drawCanvasOnly();
        tiles++;
      });
  } else {
    drawWithAxi();
    drawCanvasOnly();
    tiles++;
  }
}

function drawWithAxi() {
  zeichneDatumAxi();
  if (tiles >= gridAnzahl * floor((paperHeight - 2 * paddingY) / gridSize)) {
    // Reset the drawing position when the end of the paper is reached
    tiles = 0;
  }

  xSpalte = int(tiles % gridAnzahl);
  ySpalte = floor(tiles / gridAnzahl);

  console.log(xSpalte, ySpalte);

  if (
    xSpalte * gridSize + paddingX + gridSize <= paperWidth &&
    ySpalte * gridSize + paddingY + gridSize <= paperHeight
  ) {
    zeichneKreisAxi(xSpalte, ySpalte);
  }
}

function zeichneDatumAxi() {
  let ye = year();
  let mo = month();
  let d = day();
  console.log("Datum" + d);
  let h = hour();
  let mi = minute();

  let points = font.textToPoints(
    d + "." + mo + "." + ye + " " + h + ":" + mi,
    335,
    295,
    10,
    {
      sampleFactor: 0.75,
    }
  );
  axi.moveTo(335, 295);
  axi.penDown();

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    axi.moveTo(p.x, p.y);
    console.log(p.x, p.y);
  }
  axi.penUp();
  axi.moveTo(0, 0);
}

function zeichneKreisAxi(xSpalte, ySpalte) {
  let micLevel = mic.getLevel();
  let x1 = paddingX + xSpalte * gridSize;
  let y1 = paddingY + ySpalte * gridSize;
  let x2 = x1 + gridSize;
  let y2 = y1;
  let x3 = x2 - micLevel * 500;
  let y3 = y1 + gridSize;
  let x4 = x1 - micLevel * 500;
  let y4 = y3;
  let x5 = x1 - micLevel * 500;
  let y5 = y3;
  let x6 = x1 - micLevel * 500;
  let y6 = y3;

  let angle = micLevel * TWO_PI; // Angle of rotation based on micLevel

  // Rotate points based on angle
  let rotatedPoints = rotateRectanglePoints(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    x5,
    y5,
    x6,
    y6,
    angle
  );
  axi.penUp();
  axi.moveTo(rotatedPoints[0].x, rotatedPoints[0].y);
  axi.penDown();
  for (let i = 1; i <= rotatedPoints.length; i++) {
    axi.moveTo(
      rotatedPoints[i % rotatedPoints.length].x,
      rotatedPoints[i % rotatedPoints.length].y
    );
  }
  axi.penUp();
}

function drawCanvasOnly() {
  if (tiles >= gridAnzahl * floor((paperHeight - 2 * paddingY) / gridSize)) {
    // Reset the drawing position when the end of the paper is reached
    tiles = 0;
  }

  xSpalte = int(tiles % gridAnzahl);
  ySpalte = floor(tiles / gridAnzahl);

  if (
    xSpalte * gridSize + paddingX + gridSize <= paperWidth &&
    ySpalte * gridSize + paddingY + gridSize <= paperHeight
  ) {
    drawCirclesCanvas(xSpalte, ySpalte);
    // tiles++;
    redraw(); // Update the canvas
  }
}

function drawCirclesCanvas(xSpalte, ySpalte) {
  noFill();
  let paddingX = 40 * 2;
  let paddingY = 40 * 2;
  let gridSize = 30 * 6;

  let micLevel = mic.getLevel();
  let x1 = paddingX + xSpalte * gridSize;
  let y1 = paddingY + ySpalte * gridSize;
  let x2 = x1 + gridSize;
  let y2 = y1;
  let x3 = x2 - micLevel * 500;
  let y3 = y1 + gridSize;
  let x4 = x1 - micLevel * 500;
  let y4 = y3;
  let x5 = x1 - micLevel * 500;
  let y5 = y4;
  let x6 = x1 - micLevel * 500;
  let y6 = y4;

  let angle = micLevel * TWO_PI; // Angle of rotation based on micLevel

  // Rotate points based on angle
  let rotatedPoints = rotateRectanglePoints(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    x5,
    y5,
    x6,
    y6,
    angle
  );

  beginShape();
  for (let i = 0; i < rotatedPoints.length; i++) {
    vertex(rotatedPoints[i].x, rotatedPoints[i].y);
  }
  endShape(CLOSE);
}

// Function to rotate rectangle points around its center
function rotateRectanglePoints(
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
  x4,
  y4,
  x5,
  y5,
  x6,
  y6,
  angle
) {
  let centerX = (x1 + x2 + x3 + x4 + x5 + x6) / 4;
  let centerY = (y1 + y2 + y3 + y4 + y5 + y6) / 4;

  let rotatedPoints = [];

  // Rotate each point around the center
  rotatedPoints.push(rotatePoint(x1, y1, centerX, centerY, angle));
  rotatedPoints.push(rotatePoint(x2, y2, centerX, centerY, angle));
  rotatedPoints.push(rotatePoint(x3, y3, centerX, centerY, angle));
  rotatedPoints.push(rotatePoint(x4, y4, centerX, centerY, angle));
  rotatedPoints.push(rotatePoint(x5, y5, centerX, centerY, angle));
  rotatedPoints.push(rotatePoint(x6, y6, centerX, centerY, angle));

  return rotatedPoints;
}

// Function to rotate a point around another point
function rotatePoint(x, y, cx, cy, angle) {
  let newX = (x - cx) * cos(angle) - (y - cy) * sin(angle) + cx;
  let newY = (x - cx) * sin(angle) + (y - cy) * cos(angle) + cy;
  return { x: newX, y: newY };
}
