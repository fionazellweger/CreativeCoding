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

  let gridSize = int(map(100, 0, width, 10, 100));

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
      let fillColor;

      let dia = map(brightness, 0, 255, gridSize, 2);

      if (brightness < 85) {
        fillColor = color1;
        rect(x + gridSize / 2, y + gridSize / 2, 16, dia / 1.1);
      } else if (brightness > 85 && brightness < 100) {
        fillColor = color2;
        rect(x + gridSize / 2, y + gridSize / 2, 16, dia / 1.1);
      } else {
        fillColor = color3;
        rect(x + gridSize / 4, y + gridSize / 2, dia / 1.1, 16);
      }

      fill(fillColor);
      noStroke();
    }
  }
}
