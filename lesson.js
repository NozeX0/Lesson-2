"use strict";

let box = document.getElementById("box");
let textarea = null;

let savedText = box.textContent;

document.addEventListener("keydown", (e) => {
  const ctrl = e.ctrlKey || e.metaKey;

  if (!ctrl) return;

  if (e.key.toLowerCase() === "e") {
    e.preventDefault();
    editMode();
  }

  if (e.key.toLowerCase() === "s") {
    e.preventDefault();
    saveMode();
  }
});

function editMode() {
  if (textarea) return;

  savedText = box.textContent;

  textarea = document.createElement("textarea");
  textarea.value = savedText;

  box.replaceWith(textarea);
}

function saveMode() {
  if (!textarea) return;

  const newBox = document.createElement("div");
  newBox.id = "box";
  newBox.textContent = textarea.value;

  textarea.replaceWith(newBox);

  box = newBox;
  textarea = null;
}