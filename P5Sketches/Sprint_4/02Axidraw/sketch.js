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

function setup() {
  createCanvas(paperWidth, paperHeight);
  gridAnzahl = floor((paperWidth - 2 * paddingX) / gridSize);
  mic = new p5.AudioIn();
  noLoop();
  background(230);
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
    zeichneKreis(xSpalte, ySpalte);
    //tiles++;
  }
}

function zeichneKreis(xSpalte, ySpalte) {
  let micLevel = mic.getLevel();
  let x1 = paddingX + xSpalte * gridSize;
  let y1 = paddingY + ySpalte * gridSize;
  let x2 = x1 + gridSize;
  let y2 = y1;
  let x3 = x2;
  let y3 = y1 + gridSize;
  let x4 = x1;
  let y4 = y3;

  let points = [
    { x: x1, y: y1 - micLevel * 1000 },
    { x: x2, y: y2 - micLevel * 1000 },
    { x: x3, y: y3 - micLevel * 1000 },
    { x: x4, y: y4 - micLevel * 1000 },
  ];

  axi.moveTo(points[0].x, points[0].y);
  axi.penDown();
  for (let i = 1; i <= points.length; i++) {
    axi.moveTo(points[i % points.length].x, points[i % points.length].y);
  }
  //axi.penUp();
}

function drawCirclesCanvas(xSpalte, ySpalte) {
  noFill();

  let micLevel = mic.getLevel();
  let x1 = paddingX + xSpalte * gridSize;
  let y1 = paddingY + ySpalte * gridSize;
  let x2 = x1 + gridSize;
  let y2 = y1;
  let x3 = x2;
  let y3 = y1 + gridSize;
  let x4 = x1;
  let y4 = y3;

  let points = [
    { x: x1, y: y1 - micLevel * 1000 },
    { x: x2, y: y2 - micLevel * 1000 },
    { x: x3, y: y3 - micLevel * 1000 },
    { x: x4, y: y4 - micLevel * 1000 },
  ];

  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
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
    //tiles++;
    redraw(); // Update the canvas
  }
}
