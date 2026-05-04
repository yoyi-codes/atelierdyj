// ARRAYS PARA GUARDAR LAS ESTRELLAS
let estrellasX = [];
let estrellasY = [];
let anillosActuales = [];
let maxAnillos = [];
let diametrosBase = [];

// ARRAYS PARA GUARDAR EL CIELO Y LAS NUBES
let cieloX = [];
let cieloY = [];
let cieloAncho = [];
let cieloAlto = [];
let cieloH = [];
let cieloS = [];
let cieloL = [];

let nubesX = [];
let nubesY = [];
let nubesTamano = [];
let nubesVelocidad = [];

function setup() {
  // ANCHO Y ALTO DE LA VENTANA PARA PANTALLA COMPLETA
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  noStroke();

  // MEMORIZAMOS EL CIELO EN ARRAYS
  for (let i = 0; i < 800; i++) {
    cieloH[i] = random(210, 230);
    cieloS[i] = random(40, 80);
    cieloL[i] = random(20, 75);
    cieloX[i] = random(-50, width);
    cieloY[i] = random(-50, height);
    cieloAncho[i] = random(30, 100);
    cieloAlto[i] = random(30, 80);
  }

  // CREAMOS LAS NUBES
  for (let i = 0; i < 10; i++) {
    nubesX[i] = random(width);
    nubesY[i] = random(100, height / 2 + 100);
    nubesTamano[i] = random(150, 500);
    nubesVelocidad[i] = random(0.5, 1.5);
  }
}

function draw() {
  background(220, 60, 15);

  // PINTAMOS EL CIELO 
  for (let i = 0; i < 800; i++) {
    fill(cieloH[i], cieloS[i], cieloL[i]);
    rect(cieloX[i], cieloY[i], cieloAncho[i], cieloAlto[i]);
  }

  // CREAMOS LOS ANILLOS QUE CRECEN
  if (frameCount % 25 === 0) {
    for (let i = 0; i < estrellasX.length; i++) {
      if (anillosActuales[i] <= maxAnillos[i]) {
        anillosActuales[i]++;
      }
    }
  }

  for (let i = 0; i < estrellasX.length; i++) {
    for (let j = anillosActuales[i]; j > 0; j--) {
      let d = diametrosBase[i] + ((j - 1) * 35);
      let h = 45 + ((j * 7) % 11);
      let s = 70 + ((j * 13) % 31);
      let l = 50 + ((j * 29) % 36);

      fill(h, s, l);
      circle(estrellasX[i], estrellasY[i], d);
    }
  }

  // MOVEMOS LAS NUBES
  fill(0, 0, 100, 0.15);
  for (let i = 0; i < nubesX.length; i++) {
    ellipse(nubesX[i], nubesY[i], nubesTamano[i], nubesTamano[i] * 0.4);
    ellipse(nubesX[i] + nubesTamano[i] * 0.2, nubesY[i] - nubesTamano[i] * 0.1, nubesTamano[i] * 0.6, nubesTamano[i] * 0.3);

    nubesX[i] = nubesX[i] - nubesVelocidad[i];

    if (nubesX[i] < -nubesTamano[i]) {
      nubesX[i] = width + nubesTamano[i];
      nubesY[i] = random(100, height / 2 + 100);
    }
  }

  // DIBUJA EL OBELISCO AL FINAL PARA QUE QUEDE POR ENCIMA DE LAS ESTRELLAS
  dibujarObelisco();
}

function dibujarObelisco() {
  push();
  fill("#222E2E");
  noStroke();

  beginShape();
  vertex(width / 2 - 80, height);
  vertex(width / 2 + 80, height);
  vertex(width / 2 + 50, height * 0.35); // 35% de la pantalla
  vertex(width / 2, height * 0.15); // 15% de la pantalla (la punta)
  vertex(width / 2 - 50, height * 0.35);
  endShape(CLOSE);
  pop();
}

// CLICK PARA CREACIÓN DE ESTRELLAS
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let indice = estrellasX.length;

    estrellasX[indice] = mouseX;
    estrellasY[indice] = mouseY;

    diametrosBase[indice] = random(25, 45);
    maxAnillos[indice] = floor(random(4, 9));
    anillosActuales[indice] = 1;
  }
}

// RECALCULAR SI REDIMENSIONAN LA PANTALLA
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}