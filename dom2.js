"use strict";

const input = document.getElementById("username-input");
const answerBtn = document.getElementById("answerBtn");
const username = document.getElementById("username");

const eventsList = document.getElementById("events");
const myButton = document.getElementById("myButton");
const menu = document.getElementById("menu");

function addEvent(text){
    const li = document.createElement("li");
    li.textContent = text;
    eventsList.appendChild(li);
}

answerBtn.onclick = () => {
    const value = input.value.trim();

    if(!value) return;

    username.textContent = value;
    addEvent("name: " + value);
    input.value = "";
};

myButton.onclick = () => {
    addEvent("button clicked");
};

let dark = false;

const data = {
    events:["clear","count","last","remove last"],
    button:["disable","enable","rename","reset"],
    page:["clear all","toggle theme","random event"]
};

function styleMenu(type){

    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.position = "fixed";
    menu.style.padding = "10px";
    menu.style.minWidth = "170px";
    menu.style.borderRadius = "10px";
    menu.style.zIndex = "9999";

    if(type === "events"){
        menu.style.background = "#222";
        menu.style.color = "#fff";
    }

    if(type === "button"){
        menu.style.background = "#355fa5";
        menu.style.color = "#fff";
    }

    if(type === "page"){
        menu.style.background = dark ? "#222" : "#fff";
        menu.style.color = dark ? "#fff" : "#000";
    }
}

function buildMenu(type){

    menu.innerHTML = "";

    data[type].forEach(cmd => {

        const item = document.createElement("button");

        item.textContent = cmd;
        item.style.border = "none";
        item.style.background = "transparent";
        item.style.padding = "10px";
        item.style.cursor = "pointer";
        item.style.color = "inherit";
        item.style.textAlign = "left";

        item.onclick = () => runCommand(type, cmd);

        menu.appendChild(item);
    });
}

function showMenu(x,y,type){

    buildMenu(type);
    styleMenu(type);

    menu.style.left = x + "px";
    menu.style.top = y + "px";
}

function hideMenu(){
    menu.style.display = "none";
}

function runCommand(type, cmd){

    addEvent(type + ": " + cmd);

    if(type === "events"){

        if(cmd === "clear")
            eventsList.innerHTML = "";

        if(cmd === "count")
            alert(eventsList.children.length);

        if(cmd === "last")
            alert(eventsList.lastElementChild?.textContent || "empty");

        if(cmd === "remove last")
            eventsList.lastElementChild?.remove();
    }

    if(type === "button"){

        if(cmd === "disable")
            myButton.disabled = true;

        if(cmd === "enable")
            myButton.disabled = false;

        if(cmd === "rename")
            myButton.textContent = "CHANGED";

        if(cmd === "reset"){
            myButton.disabled = false;
            myButton.textContent = "Click me";
        }
    }

    if(type === "page"){

        if(cmd === "clear all"){
            eventsList.innerHTML = "";
            username.textContent = "";
        }

        if(cmd === "toggle theme"){

            dark = !dark;

            document.body.style.background =
                dark ? "#111" : "#fff";

            document.body.style.color =
                dark ? "#fff" : "#000";
        }

        if(cmd === "random event"){
            addEvent(
                "system " +
                Math.floor(Math.random()*1000)
            );
        }
    }

    hideMenu();
}

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

    if(eventsList.contains(e.target)){
        showMenu(e.pageX,e.pageY,"events");
        return;
    }

    if(myButton.contains(e.target)){
        showMenu(e.pageX,e.pageY,"button");
        return;
    }

    showMenu(e.pageX,e.pageY,"page");
});

document.addEventListener("click",hideMenu);

let box = document.getElementById("box");
let textarea = null;

document.addEventListener("keydown",(e)=>{

    if(!e.ctrlKey) return;

    if(e.key.toLowerCase() === "e"){
        e.preventDefault();
        editMode();
    }

    if(e.key.toLowerCase() === "s"){
        e.preventDefault();
        saveMode();
    }
});

function editMode(){

    if(textarea) return;

    textarea = document.createElement("textarea");
    textarea.value = box.textContent;

    box.replaceWith(textarea);

    textarea.focus();
}

function saveMode(){

    if(!textarea) return;

    const newBox = document.createElement("div");

    newBox.id = "box";
    newBox.textContent = textarea.value;

    textarea.replaceWith(newBox);

    box = newBox;
    textarea = null;
}

const resizable =
    document.getElementById("resizable");

const handle =
    document.getElementById("resize-handle");

let resizing = false;

handle.addEventListener("mousedown",()=>{

    resizing = true;
});

document.addEventListener("mousemove",(e)=>{

    if(!resizing) return;

    const rect =
        resizable.getBoundingClientRect();

    resizable.style.width =
        (e.clientX - rect.left) + "px";

    resizable.style.height =
        (e.clientY - rect.top) + "px";
});

document.addEventListener("mouseup",()=>{

    resizing = false;
});

const colorBox =
    document.getElementById("colorBox");

const r =
    document.getElementById("r");

const g =
    document.getElementById("g");

const b =
    document.getElementById("b");

const rVal =
    document.getElementById("rVal");

const gVal =
    document.getElementById("gVal");

const bVal =
    document.getElementById("bVal");

function updateColor(){

    rVal.textContent = r.value;
    gVal.textContent = g.value;
    bVal.textContent = b.value;

    colorBox.style.backgroundColor =
        `rgb(${r.value},${g.value},${b.value})`;
}

r.addEventListener("input",updateColor);
g.addEventListener("input",updateColor);
b.addEventListener("input",updateColor);

updateColor();