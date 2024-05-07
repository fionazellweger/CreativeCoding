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

  //gridset();
  gridset2();
}

function gridset() {
  frameRate(10);
  let gridSize = int(map(100, 0, width, 15, 120));

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];

      let brightness =
        (r + video.pixels[index + 1] + video.pixels[index + 2]) / 3;

      // Choose colors based on brightness
      let color1 = color(255, 0, 0, 110); // Red
      let color2 = color(0, 0, 255, 110); // Blue
      let color3 = color(255, 0, 255, 110); // Magenta
      let color4 = color(255, 255, 0, 110); // Yellow

      let fillColor;

      let dia = map(brightness, 0, 255, gridSize, 2);

      if (brightness < 85) {
        fillColor = color3;
        fill(color3);
        circle(x + gridSize / 2, y + gridSize, 15);
        fillColor = color1;
        fill(color1);
        circle(x + gridSize / 2, y + gridSize, 8);
      } else if (brightness > 85 && brightness < 160) {
        fillColor = color2;
        fill(color2);
        circle(x + gridSize / 2, y + gridSize, 15);
        fillColor = color3;
        fill(color3);
        circle(x + gridSize / 2, y + gridSize, 8);
      } else {
        fillColor = color4;
        fill(color4);
        circle(x + gridSize / 2, y + gridSize, 15);
        fillColor = color1;
        fill(color1);
        circle(x + gridSize / 2, y + gridSize, 8);
      }

      fill(fillColor);
      noStroke();
    }
  }
}

function gridset2() {
  frameRate(60);
  let gridSize = int(map(100, 0, width, 5, 80));

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];

      let brightness =
        (r + video.pixels[index + 1] + video.pixels[index + 2]) / 3;

      // Choose colors based on brightness
      let color1 = color(255, 0, 0, 110); // Red
      let color2 = color(0, 0, 255, 110); // Blue
      let color3 = color(255, 0, 255, 110); // Magenta
      let color4 = color(255, 255, 0, 110); // Yellow

      let fillColor;

      let dia = map(brightness, 0, 255, gridSize, 2);

      if (brightness < 85) {
        fillColor = color3;
        fill(color3);
        rect(x + gridSize / 2, y + gridSize, 15, dia);
        fillColor = color1;
        fill(color1);
        rect(x + gridSize / 2, y + gridSize, 8, dia);
      } else if (brightness > 85 && brightness < 160) {
        fillColor = color2;
        fill(color2);
        rect(x + gridSize / 2, y + gridSize, 15, dia);
        fillColor = color3;
        fill(color3);
        rect(x + gridSize / 2, y + gridSize, 8, dia);
      } else {
        fillColor = color4;
        fill(color4);
        rect(x + gridSize / 2, y + gridSize, 40, dia);
        fillColor = color1;
        fill(color1);
        rect(x + gridSize / 2, y + gridSize, 8, dia);
      }

      fill(fillColor);
      noStroke();
    }
  }
}
