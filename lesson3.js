"use strict";

const box = document.getElementById("colorBox");

const r = document.getElementById("r");
const g = document.getElementById("g");
const b = document.getElementById("b");

function updateColor() {
  const red = r.value;
  const green = g.value;
  const blue = b.value;

  box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

r.addEventListener("input", updateColor);
g.addEventListener("input", updateColor);
b.addEventListener("input", updateColor);

updateColor();