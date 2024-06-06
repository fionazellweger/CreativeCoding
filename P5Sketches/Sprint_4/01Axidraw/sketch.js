const axi = new axidraw.AxiDraw();
let connected = false;

let posX = 0;
let posY = 0;

let paperWidth = 420;
let paperHeight = 297;

let paddingX = 20;
let paddingY = 20;

let gridSize = 50;

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
  paperWidth = windowWidth;
  paperHeight = windowHeight;
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
    tiles = 0;
  }

  xSpalte = int(tiles % gridAnzahl);
  ySpalte = floor(tiles / gridAnzahl);

  if (
    xSpalte * gridSize + paddingX + gridSize <= paperWidth &&
    ySpalte * gridSize + paddingY + gridSize <= paperHeight
  ) {
    zeichneKreis(xSpalte, ySpalte);
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

function zeichneKreis(xSpalte, ySpalte) {
  let micLevel = mic.getLevel();
  let steps = 20;
  let radius = micLevel * 5000;

  let x = cos(radians(0)) * radius + paddingX + xSpalte * gridSize;
  let y = sin(radians(0)) * radius + paddingY + ySpalte * gridSize;
  let nextx;
  let nexty;

  axi.moveTo(x, y);
  axi.penDown();
  for (let s = 1; s <= steps; s++) {
    nextx =
      cos(radians((360 / steps) * s)) * radius + paddingX + xSpalte * gridSize;
    nexty =
      sin(radians((360 / steps) * s)) * radius + paddingY + ySpalte * gridSize;
    axi.moveTo(nextx, nexty);
  }
  axi.penUp();

  let x1 = paddingX + xSpalte * gridSize;
  let y1 = paddingY + ySpalte * gridSize;
  let x2 = x1 + gridSize + micLevel * 1000;
  let y2 = y1 + micLevel * 1000;
  let x3 = x2;
  let y3 = y1 + gridSize;
  let x4 = x1 + micLevel * 1000;
  let y4 = y3 + micLevel * 1000;

  axi.moveTo(x1, y1);
  axi.penDown();
  axi.moveTo(x2, y2);
  axi.moveTo(x3, y3);
  axi.moveTo(x4, y4);
  axi.moveTo(x1, y1);
  axi.penUp();
}

function drawCirclesCanvas(xSpalte, ySpalte) {
  noFill();

  let paddingX = 40 * 2;
  let paddingY = 40 * 2;
  let gridSize = 30 * 5;

  let micLevel = mic.getLevel();

  console.log(micLevel);

  let x1 = paddingX + xSpalte * gridSize;
  let y1 = paddingY + ySpalte * gridSize;
  let x2 = x1 + gridSize;
  let y2 = y1;
  let x3 = x2 + micLevel * 1000;
  let y3 = y1 + gridSize + micLevel * 1000;
  let x4 = x1 + micLevel * 1000;
  let y4 = y3 + micLevel * 1000;

  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  vertex(x4, y4);
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
    redraw(); // Update the canvas
  }
}
