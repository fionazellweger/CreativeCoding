let lines, markov, data1, data2, data3;
let x = 80;
let y = 170;
let button1, button2;

function preload() {
  data1 = loadStrings("data/Werther.txt");
  data2 = loadStrings("data/Liebesbriefe.txt");
  data3 = loadStrings("data/SPAM_alle.txt");
  font1 = loadFont("data/MessinaSans-Black.otf");
  font2 = loadFont("data/MessinaSerif-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(55);
  textAlign(LEFT);

  loadText1();

  drawText();

  button1 = createButton("Liebesbriefe");
  button1.position(80, 30);
  button1.mousePressed(loadText1);
  button1.style("font-size", "55px");
  button1.style("color", "#F0F0F0");
  button1.style("background-color", "#ff2823");
  button1.style("border", "none");
  button1.style("font-family", "font1");

  button2 = createButton("Die Leiden des jungen Werther");
  button2.position(390, 30);
  button2.mousePressed(loadText2);
  button2.style("font-size", "55px");
  button2.style("color", "#F0F0F0");
  button2.style("background-color", "#ff2823");
  button2.style("border", "none");
  button2.style("font-family", "font2");

  button3 = createButton("♥ send love ♥");
  button3.position(1320, 30);
  button3.mousePressed(verschicken);
  button3.style("font-size", "55px");
  button3.style("color", "#F0F0F0");
  button3.style("background-color", "#ff2823");
  button3.style("border", "none");
  button3.style("font-family", "font2");
}

function drawText() {
  background(240);
  fill("#ff2823");
  textAlign(LEFT);

  let posX = x;
  let posY = y;
  let spaceWidth = textWidth(" ");


  let data1Words = data1.join(" ");
  let data2Words = data2.join(" ");
  let data3Words = data3.join(" ");


  let words = lines.join(" ").split(" ");

  for (let word of words) {
    if (data1Words.includes(word)) {
      textFont(font2);
    } else if (data3Words.includes(word)) {
      textFont(font1);
    } else if (data2Words.includes(word)) {
      textFont(font2);
    } else {
      textFont(font2); 
    }

    let wordWidth = textWidth(word);

    if (posX + wordWidth >= windowWidth - 100) {
      posX = x;
      posY += 65; 
    }

    text(word, posX, posY);

    posX += wordWidth + spaceWidth;
  }
}

function loadText1() {
  markov = RiTa.markov(3);
  markov.addText(data3.join(" "));
  markov.addText(data2.join(" "));
  lines = markov.generate(3);
  drawText();
}

function loadText2() {
  markov = RiTa.markov(2);
  markov.addText(data1.join(" "));
  markov.addText(data3.join(" "));
  lines = markov.generate(3);
  drawText();
}

function verschicken() {
  saveCanvas("love.jpg");
}
