const SHADES = 10;
let r = Array(SHADES);
let g = Array(SHADES);
let b = Array(SHADES);
let colors = Array(SHADES);

for (let i = 0; i < SHADES; i++) {
  r[i] = Math.floor(255 * (1 - i / (SHADES - 1)));
  colors[i] = `rgb(${r[i]}, ${r[i]}, ${r[i]})`;
}

const CANVAS = document.querySelector(".canvas");
const RESET = document.querySelector(".reset-btn");
let ppsInput = document.querySelector("input");

ppsInput.addEventListener("input", setPPS);
RESET.addEventListener("click", resetPixels);

function setPPS(e) {
  pps = parseInt(e.target.value);
  if (0 < pps && pps <= 100) {
    createCanvas(pps);
  } else if (pps <= 0) {
    ppsInput.value = 1;
    createCanvas(1);
  } else if (pps > 100) {
    ppsInput.value = 100;
    createCanvas(100);
  } else {
    pps.Input.value = 16;
    createCanvas(16);
  }
}

function deletePixels() {
  pixels = document.querySelectorAll(".pixel");
  pixels.forEach((px) => {
    CANVAS.removeChild(px);
  });
}

function resetPixels() {
  pixels = document.querySelectorAll(".pixel");
  pixels.forEach((px) => {
    px.style.backgroundColor = colors[0];
  });
}

function darken(e) {
  for (let i = 0; i < SHADES - 1; i++) {
    if (e.target.style.backgroundColor === colors[i]) {
      e.target.style.backgroundColor = colors[i + 1];
      return;
    }
  }
}

function createCanvas(l) {
  deletePixels();
  CANVAS.style.cssText = `grid-template: repeat(${l}, 1fr) / repeat(${l}, 1fr)`;
  for (let i = 1; i <= l ** 2; i++) {
    pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.style.backgroundColor = colors[0];
    pixel.addEventListener("mouseover", (e) => {
      darken(e);
    });
    CANVAS.appendChild(pixel);
  }
}

createCanvas(16);
