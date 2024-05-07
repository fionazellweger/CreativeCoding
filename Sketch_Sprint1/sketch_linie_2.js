let video;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Video capture from webcam (in the size of the window)
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
}

function draw() {
  background(255);
  gridset();
}

function gridset() {
  let gridSize = int(map(100, 0, width, 15, 120));

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];

      let brightness =
        (r + video.pixels[index + 1] + video.pixels[index + 2]) / 3;

      // Choose colors based on brightness
      let color1 = color(255, 0, 0); // Red
      let color2 = color(0, 0, 255); // Blue
      let color3 = color(255, 0, 255); // Magenta
      let color4 = color(0, 255, 0); // Yellow

      let fillColor;

      let dia = map(brightness, 0, 255, gridSize, 2);

      if (brightness < 85) {
        fillColor = color3;
        stroke(color3);
        line(x + gridSize / 2, y + gridSize / 2, x + gridSize, y + gridSize);
        fillColor = color1;
        stroke(color1);
        strokeWeight(3);
        line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
      } else if (brightness > 85 && brightness < 160) {
        fillColor = color2;
        stroke(color2);
        line(x + gridSize / 2, y + gridSize / 2, x + gridSize, y + gridSize);
        fillColor = color4;
        stroke(color4);
        strokeWeight(3);
        line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
      } else {
        ffillColor = color1;
        stroke(color1);
        line(x + gridSize / 2, y + gridSize / 2, x + gridSize, y + gridSize);
        fillColor = color2;
        stroke(color2);
        strokeWeight(3);
        line(x + gridSize / 2, y + gridSize, x + gridSize, y + gridSize / 2);
      }

      fill(fillColor);
      noStroke();
    }
  }
}
