"use strict";

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.assign(node, props);

  children.forEach(child => {
    if (typeof child === "string") {
      node.appendChild(document.createTextNode(child));
    } else if (child) {
      node.appendChild(child);
    }
  });

  return node;
}

const style = document.createElement("style");
style.textContent = `
body { font-family: Arial; padding: 20px; }

.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
}

.modal {
  background: #dff;
  padding: 30px;
  min-width: 300px;
  text-align: center;
}

.traffic {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 40px;
}

.light-box {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 2px solid #aaa;
  border-radius: 10px;
}

.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: gray;
}

.active-red { background: red; }
.active-yellow { background: orange; }
.active-green { background: green; }

ul { margin-top: 40px; padding: 0; list-style: none; }

li {
  cursor: pointer;
  padding: 8px;
}

.active-book {
  background: orange;
}
`;

document.head.appendChild(style);

const root = document.createElement("div");
document.body.appendChild(root);

const modal = el(
  "div",
  { className: "modal-overlay", id: "modal" },
  el(
    "div",
    { className: "modal" },
    el("h2", {}, "Hello from Modal Window!"),
    el("button", { id: "closeModalBtn" }, "Close")
  )
);

const openModalBtn = el("button", { id: "openModalBtn" }, "Open modal");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

modal.querySelector("#closeModalBtn").addEventListener("click", () => {
  modal.style.display = "none";
});

const circles = [0, 1, 2].map(() => el("div", { className: "circle" }));

let index = 0;

function renderTraffic() {
  circles.forEach(c => (c.className = "circle"));

  if (index === 0) circles[0].classList.add("active-red");
  if (index === 1) circles[1].classList.add("active-yellow");
  if (index === 2) circles[2].classList.add("active-green");
}

const nextBtn = el(
  "button",
  { id: "nextBtn", style: "height:120px;width:100px;" },
  "NEXT"
);

nextBtn.addEventListener("click", () => {
  index = (index + 1) % 3;
  renderTraffic();
});

renderTraffic();

const bookList = el(
  "ul",
  { id: "bookList" },
  el("li", {}, "1. \"JavaScript for Kids: A Playful Introduction to Programming\" by Nick Morgan"),
  el("li", {}, "2. \"Eloquent JavaScript: A Modern Introduction to Programming\" by Marijn Haverbeke"),
  el("li", {}, "3. \"JavaScript: The Good Parts\" by Douglas Crockford"),
  el("li", {}, "4. \"Programming JavaScript Applications: Robust Web Architecture with Node, HTML5, and Modern JS Libraries\" by Eric Elliott"),
  el("li", {}, "5. \"Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript\" by David Herman"),
  el("li", {}, "6. \"JavaScript: The Definitive Guide\" by David Flanagan"),
  el("li", {}, "7. \"You Don't Know JS\" by Kyle Simpson")
);

let activeBook = null;

bookList.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", () => {
    if (activeBook) activeBook.classList.remove("active-book");
    li.classList.add("active-book");
    activeBook = li;
  });
});

const traffic = el(
  "div",
  { className: "traffic" },
  el("div", { className: "light-box" }, ...circles),
  nextBtn
);

root.append(openModalBtn, modal, traffic, bookList);