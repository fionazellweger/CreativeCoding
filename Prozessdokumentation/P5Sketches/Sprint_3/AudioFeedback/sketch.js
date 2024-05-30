let mic;
let video;
let sound;

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  cnv.mousePressed(startVideoAudio);
  textAlign(CENTER);
  rectMode(CENTER);

  mic = new p5.AudioIn();
  mic.start();

  video = createVideo(["Video1.mp4"]);
  video.size(windowWidth, windowHeight);
  video.hide();

  soundFormats("mp3");
  sound = loadSound("recordings/audio1.mp3");
}

function draw() {
  background(0);

  strokeWeight(1);
  text("tap to start", width / 2, 20);
  let micLevel = mic.getLevel();

  let gridSize = int(map(100, 0, width, 12, 150));

  if (key === "1") {
    gridset1(micLevel, gridSize);
  } else if (key === "2") {
    gridset2(micLevel, gridSize);
  } else if (key === "3") {
    gridset3(micLevel, gridSize);
  } else {
    gridset1(micLevel, gridSize);
  }
}

function gridset1(micLevel, gridSize) {
  background("#F23005");

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      let hue = map(micLevel * 20, 0, 1, 0, 255);

      let color1, color2;

      if (brightness < 85) {
        color1 = color("#010D00");
        color2 = color("#0583F2");
      } else if (brightness >= 85 && brightness < 170) {
        color1 = color("#35D930");
        color2 = color("#F23005");
      } else {
        color1 = color("#F2F2F2");
        color2 = color("#0583F2");
      }

      let rectWidth = map(micLevel, 0, 1, 30, gridSize);
      let rectHeight = map(micLevel * 50, 0, 1, 5, gridSize);

      for (let i = 0; i < rectHeight; i++) {
        let inter = map(i, 0, rectHeight, 0, micLevel * 40);
        let fillColor = lerpColor(color1, color2, inter);
        stroke(fillColor);
        line(x, y + i, x + rectWidth, y + i);
      }

      noStroke();
    }
  }
}

function gridset2(micLevel, gridSize) {
  background(170, 181, 209);

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      let hue = map(micLevel * 20, 0, 1, 0, 255);

      let color1, color2;

      if (brightness < 85) {
        color1 = color(217, 43, 58);
        color2 = color(170, 181, 209);
      } else if (brightness >= 85 && brightness < 170) {
        color1 = color(162, 199, 68);
        color2 = color(170, hue, 209);
      } else {
        color1 = color(217, 43, 58);
        color2 = color(170, 181, hue);
      }

      let rectWidth = map(micLevel, 0, 1, 30, gridSize);
      let rectHeight = map(micLevel * 50, 0, 1, 5, gridSize);

      for (let i = 0; i < rectHeight; i++) {
        let inter = map(i, 0, rectHeight, 0, 1);
        let fillColor = lerpColor(color1, color2, inter);
        stroke(fillColor);
        line(x, y + i, x + rectWidth, y + i);
      }

      noStroke();
    }
  }
}

function gridset3(micLevel, gridSize) {
  background(195, 242, 94);

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      let hue = map(micLevel * 20, 0, 1, 0, 255);

      let color1, color2;

      if (brightness < 85) {
        color1 = color(159, 161, 166); // Red
        color2 = color(195, 242, 94); // Blue
      } else if (brightness >= 85 && brightness < 170) {
        color1 = color(179, 191, 136); // Red
        color2 = color(242, hue, 7); // Yellow
      } else {
        color1 = color(159, 161, 166); // Cyan
        color2 = color(242, 137, 7); // Magenta
      }

      let rectWidth = map(micLevel, 0, 1, 30, gridSize);
      let rectHeight = map(micLevel * 50, 0, 1, 5, gridSize);

      for (let i = 0; i < rectHeight; i++) {
        let inter = map(i, 0, rectHeight, 0, 1);
        let fillColor = lerpColor(color1, color2, inter);
        stroke(fillColor);
        line(x, y + i, x + rectWidth, y + i);
      }

      noStroke();
    }
  }
}

function startVideoAudio() {
  video.loop(); // Loop the video
  video.volume(0); // Mute the video
  sound.play();
  sound.loop();
  userStartAudio();
}

function keyPressed() {
  // Stop the currently playing sound, if any
  if (sound) {
    sound.stop();
  }

  // Change video and load new sound based on key pressed
  if (key === "1") {
    video = createVideo(["Video1.mp4"]);
    sound = loadSound("recordings/audio1.mp3", startVideoAudio);
  } else if (key === "2") {
    video = createVideo(["Video2.mp4"]);
    sound = loadSound("recordings/audio2.mp3", startVideoAudio);
  } else if (key === "3") {
    video = createVideo(["Video3.mp4"]);
    sound = loadSound("recordings/audio3.mp3", startVideoAudio);
  }

  // Hide the video element and redraw canvas
  video.size(windowWidth, windowHeight);
  video.hide();
  redraw();
}
