const initialCursorPos =  [6,6];
let currentCursorPos = [initialCursorPos[0], initialCursorPos[1]];
let moveDown = 0;
setInterval(blinkCursor, 250);

document.addEventListener('DOMContentLoaded', ()=>{
    init();
});
document.addEventListener('keydown', handleKeyPress);

function blinkCursor(){
    const cursor = document.getElementById("cursor");
    if(cursor.style.visibility === "hidden"){
        cursor.style.visibility = "visible";
    }else{
        cursor.style.visibility = "hidden";
    }
}
function init(){
    cursorElement = document.createElement("div");
    cursorElement.id = "cursor";
    cursorElement.style.position = "absolute";
    cursorElement.style.width = "1px";
    cursorElement.style.height = "5px";
    cursorElement.style.left = initialCursorPos[0] + "px";
    cursorElement.style.top = initialCursorPos[1] + "px";
    cursorElement.style.visibility = "visible";
    cursorElement.style.backgroundImage = "url('../src/images/ll.png')";
    document.getElementById("all").appendChild(cursorElement);
}
function handleKeyPress(e){
    const keyPressed = e.key;
    let width =3;
    switch(keyPressed){
        case "m":
            width =5;
            break;
        case "w":
            width = 5;
            break;
        case "l":
            width = 1;
            break;
        case ".":
            width = 1;
            break;
        case "!":
            width = 1;
            break;
    }
    if (currentCursorPos[0] > 310){
        currentCursorPos[0] = initialCursorPos[0];
        currentCursorPos[1] += 6; // Move down to the next line
        document.getElementById("cursor").style.top = currentCursorPos[1] + "px";
    }
    if (keyPressed == "g" || keyPressed == "y" || keyPressed == "q"){
        moveDown = 2;
    }
    newLetter = document.createElement("div");
    // cursorElement.class = "letter";
    newLetter.style.imageRendering = "pixelated";
    newLetter.style.position = "absolute";
    newLetter.style.width = width + "px";
    newLetter.style.height = "5px";
    newLetter.style.left = currentCursorPos[0] + "px";
    newLetter.style.top = (currentCursorPos[1] + moveDown) + "px";
    moveDown = 0;
    newLetter.style.backgroundImage = "url('../src/images/" + keyPressed +"l.png')";
    document.getElementById("all").appendChild(newLetter);
    currentCursorPos[0] += (width + 1);
    console.log(currentCursorPos);
    document.getElementById("cursor").style.left = currentCursorPos[0] + "px";
}