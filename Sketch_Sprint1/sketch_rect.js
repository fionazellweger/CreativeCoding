let capture;
let breite = 900;
let höhe = 600;
let density;

let pixelDens;
let pixelSize;

function setup() {
  createCanvas(breite, höhe);

  let constraints = {
    video: {
      mandatory: {
        minWidth: höhe,
        minHeight: breite,
      },
      optional: [{ maxFrameRate: 60 }],
    },
    audio: false,
  };
  capture = createCapture(constraints);
  capture.size(breite, höhe);
  capture.hide();
  density = pixelDensity();
}

function draw() {
  background(220);
  image(capture, 0, 0, breite, höhe);

  getSlider();
  gridset();
}

function testPixels() {
  loadPixels();
  let x = width / 2;
  let y = height / 2;
  console.log("Point: " + x + "," + y);
  let index = (x + y) * 4;
  let r = pixels[index];
  let g = pixels[index + 1];
  let b = pixels[index + 2];
  let a = pixels[index + 3];
  console.log(r, g, b, a);
}

function getSlider() {
  pixelDens = document.getElementById("pixeldens").value;
  pixelSize = document.getElementById("pixelsize").value;
  console.log("pixelDens: " + pixelDens + "\n pixelSize: " + pixelSize);
}

function gridset() {
  loadPixels();
  let gridSize = pixelDens;
  let cellSize = width / gridSize;

  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      // Berechnung des Index im Pixel-Array
      let index = (x + y * density * width) * 4 * density;

      // Extrahieren der Farbkomponenten
      let r = pixels[index + 2];
      let g = pixels[index + 1];
      let b = pixels[index + 3];
      let a = pixels[index + 2];

      // Erstellen der Farbe
      let c = color(r, g, b, a);

      // Festlegen der Farbe und Stärke
      stroke(c);
      strokeWeight(pixelSize);

      // Zeichnen des Rechtecks
      rect(x, y, cellSize, cellSize);
    }
  }
}
