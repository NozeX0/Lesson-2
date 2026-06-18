"use strict";

const input = document.getElementById("username-input");
const answerBtn = document.getElementById("answerBtn");
const username = document.getElementById("username");

const eventsList = document.getElementById("events");
const myButton = document.getElementById("myButton");
const menu = document.getElementById("menu");

function addEvent(text) {
  const li = document.createElement("li");
  li.textContent = text;
  eventsList.appendChild(li);
}

answerBtn.onclick = () => {
  const value = input.value.trim();
  if (!value) return;

  username.textContent = value;
  addEvent("name: " + value);
  input.value = "";
};

myButton.onclick = () => {
  addEvent("button clicked");
};

let dark = false;

const data = {
  events: ["clear", "count", "last", "remove last"],
  button: ["disable", "enable", "rename", "reset"],
  page: ["clear all", "toggle theme", "random event"]
};

function styleMenu(type) {
  menu.className = "menu show";

  menu.style.position = "fixed";
  menu.style.display = "flex";
  menu.style.flexDirection = "column";
  menu.style.padding = "10px";
  menu.style.minWidth = "170px";
  menu.style.zIndex = "9999";
  menu.style.borderRadius = "12px";
  menu.style.transition = "0.15s";
  menu.style.transform = "scale(1)";
  menu.style.opacity = "1";
  menu.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
  menu.style.backdropFilter = "blur(10px)";

  if (type === "events") {
    menu.style.background = "rgba(30,30,30,0.95)";
    menu.style.color = "white";
  }

  if (type === "button") {
    menu.style.background = "rgba(40,70,120,0.95)";
    menu.style.color = "white";
  }

  if (type === "page") {
    menu.style.background = dark ? "rgba(30,30,30,0.9)" : "rgba(255,255,255,0.95)";
    menu.style.color = dark ? "white" : "black";
  }
}

function buildMenu(type) {
  menu.innerHTML = "";

  data[type].forEach(cmd => {
    const item = document.createElement("button");
    item.textContent = cmd;

    item.style.border = "none";
    item.style.background = "transparent";
    item.style.textAlign = "left";
    item.style.padding = "10px";
    item.style.cursor = "pointer";
    item.style.borderRadius = "8px";
    item.style.transition = "0.2s";
    item.style.fontSize = "14px";
    item.style.color = "inherit";

    item.onmouseenter = () => {
      item.style.background = "rgba(255,255,255,0.15)";
      item.style.transform = "translateX(4px)";
    };

    item.onmouseleave = () => {
      item.style.background = "transparent";
      item.style.transform = "translateX(0)";
    };

    item.onclick = () => runCommand(type, cmd);

    menu.appendChild(item);
  });
}

function showMenu(x, y, type) {
  buildMenu(type);
  styleMenu(type);

  const w = 170;
  const h = data[type].length * 42;

  const px = Math.min(x, window.innerWidth - w);
  const py = Math.min(y, window.innerHeight - h);

  menu.style.left = px + "px";
  menu.style.top = py + "px";

  menu.classList.add("show");
}

function hideMenu() {
  menu.classList.remove("show");
  menu.style.display = "none";
}

function runCommand(type, cmd) {
  addEvent(type + ": " + cmd);

  if (type === "events") {
    if (cmd === "clear") eventsList.innerHTML = "";

    if (cmd === "count") {
      addEvent("total: " + eventsList.children.length);
    }

    if (cmd === "last") {
      alert(eventsList.lastElementChild?.textContent || "empty");
    }

    if (cmd === "remove last") {
      eventsList.lastElementChild?.remove();
    }
  }

  if (type === "button") {
    if (cmd === "disable") myButton.disabled = true;

    if (cmd === "enable") myButton.disabled = false;

    if (cmd === "rename") myButton.textContent = "CHANGED";

    if (cmd === "reset") {
      myButton.disabled = false;
      myButton.textContent = "Click me";
    }
  }

  if (type === "page") {
    if (cmd === "clear all") {
      eventsList.innerHTML = "";
      username.textContent = "";
    }

    if (cmd === "toggle theme") {
      dark = !dark;
      document.body.style.background = dark ? "#111" : "#fff";
      document.body.style.color = dark ? "#fff" : "#000";
    }

    if (cmd === "random event") {
      addEvent("system " + Math.floor(Math.random() * 9999));
    }
  }

  hideMenu();
}

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  if (eventsList.contains(e.target)) {
    showMenu(e.pageX, e.pageY, "events");
    return;
  }

  if (myButton.contains(e.target)) {
    showMenu(e.pageX, e.pageY, "button");
    return;
  }

  showMenu(e.pageX, e.pageY, "page");
});

document.addEventListener("click", hideMenu);