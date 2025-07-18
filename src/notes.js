const initialCursorPos =  [6,6];
let currentCursorPos = [initialCursorPos[0], initialCursorPos[1]];
let shiftOn = false;
let notes = new Map();
let noteProperties = new Map();

document.addEventListener('DOMContentLoaded', init);

//for each item in local storage add it into notes;
function init(){
    for(let i = 0; i < localStorage.length/2; i++){
        notes.set(i, localStorage[i + ""]);
        noteProperties.set(i, localStorage[i + "pose"]);
        noteEntry = document.createElement("div");
         noteEntry.className = "noteEntry";
         noteEntry.id = i + "entry";
         noteEntry.addEventListener("click", loadNote);
        document.getElementById("menu").appendChild(noteEntry);
    }
    newNote = document.createElement("div");
     newNote.id = "currentNote";
     newNote.style.display = "none";
     document.getElementById("all").appendChild(newNote);
     noteInit();

}
function loadNote(e){
    eID = parseInt(e.target.id);
    note = document.getElementById("currentNote");
    note.className = eID + "";
    note.innerHTML = JSON.parse(notes.get(eID));
    document.getElementById("menu").style.display = "none";
    document.getElementById("currentNote").style.display = "block";
    currentCursorPos = JSON.parse(noteProperties.get(eID));
}
function createNewNote(){
    newNote.className = notes.size;
    document.getElementById("menu").style.display = "none";
    document.getElementById("currentNote").style.display = "block";
}

function saveToStorage(){
    currentNote = document.getElementById("currentNote").className;
    currentNoteInt = parseInt(currentNote);
    notes.set(currentNoteInt, JSON.stringify(document.getElementById("currentNote").innerHTML));
    noteProperties.set(currentNoteInt, JSON.stringify(currentCursorPos));
    localStorage.setItem(currentNote, notes.get(currentNoteInt));
    localStorage.setItem(currentNote + "pose", noteProperties.get(currentNoteInt));
}






























let charWidths = {
    "0": 3,
    "1": 3,
    "2": 3,
    "3": 3,
    "4": 3,
    "5": 3,
    "6": 3,
    "7": 3,
    "8": 3,
    "9": 3,
    "a": 3,
    "b": 3,
    "c": 3,
    "d": 3,
    "e": 3,
    "f": 3,
    "g": 3,
    "h": 3,
    "i": 2,
    "j": 3,
    "k": 3,
    "l": 1,
    "m": 5,
    "n": 3,
    "o": 3,
    "p": 3,
    "q": 3,
    "r": 2,
    "s": 3,
    "t": 3,
    "u": 3,
    "v": 3,
    "w": 5,
    "x": 3,
    "y": 3,
    "z": 3,
    "A": 3,
    "B": 3,
    "C": 3,
    "D": 3,
    "E": 3,
    "F": 3,
    "G": 3,
    "H": 3,
    "I": 3,
    "J": 3,
    "K": 3,
    "L": 3,
    "M": 5,
    "N": 3,
    "O": 3,
    "P": 3,
    "Q": 4,
    "R": 3,
    "S": 3,
    "T": 3,
    "U": 3,
    "V": 3,
    "W": 5,
    "X": 3,
    "Y": 3,
    "Z": 3,
    " ": 1,
    ",": 2,
    ".": 1,
    "!": 1,
    "?": 3,
    "#": 5,
    "%": 3,
    "$": 3,
    "(": 2,
    ")": 2,
    "[":2,
    "]":2,
    "{": 3,
    "}": 3,
    "/": 3,
    "^": 3,
    "\\": 3,
    ":": 1,
    ";": 1,
    "~": 4,
    "Tab": 8,
    "Enter": 0
}


document.getElementById("create").addEventListener('click', createNewNote);

function blinkCursor(){
    const cursor = document.getElementById("cursor");
    if(cursor.style.visibility === "hidden"){
        cursor.style.visibility = "visible";
    }else{
        cursor.style.visibility = "hidden";
    }
}
function noteInit(){
    document.addEventListener('keydown', (e) =>
    {
        handleKeyPress(e);
        saveToStorage();
    });
    document.addEventListener('keyup', (e)=>{
        if (e.key === "Shift"){
            shiftOn = false;
        }
    });
    cursorElement = document.createElement("div");
     cursorElement.id = "cursor";
     cursorElement.style.position = "absolute";
     cursorElement.style.width = "1px";
     cursorElement.style.height = "5px";
     cursorElement.style.left = initialCursorPos[0] + "px";
     cursorElement.style.top = initialCursorPos[1] + "px";
     cursorElement.style.visibility = "visible";
     cursorElement.style.backgroundImage = "url('../src/images/ll.png')";
    document.getElementById("currentNote").appendChild(cursorElement);
    setInterval(blinkCursor, 250);
    exit = document.createElement("div");
     exit.style.backgroundImage = "url('../src/image/exit.png')";
}

function handleKeyPress(e){
    const keyPressed = e.key;
    const capsOn = e.getModifierState("CapsLock");
    let moveOver = 0;
    let moveDown = 0;

    if (keyPressed == "Shift"){
        shiftOn = true;
        return;
    } else if(keyPressed == "Enter"){
        currentCursorPos[0] = initialCursorPos[0];
        currentCursorPos[1] += 7; // Move down to the next line
        document.getElementById("cursor").style.left = currentCursorPos[0] + "px";
        document.getElementById("cursor").style.top = currentCursorPos[1] + "px";
        return;

    } else if (keyPressed == "Backspace"){
        let lastChar = document.getElementById("currentNote").lastChild;
        if (!lastChar || lastChar.id === "cursor") {
            return;
        }
        lastChar.remove();
        let newLastChar = document.getElementById("currentNote").lastChild;
        if(newLastChar.id == "cursor" || !newLastChar){
            currentCursorPos[0] = initialCursorPos[0];
            currentCursorPos[1] = initialCursorPos[1];
        }
        else{
            let newLastCharStyle = getComputedStyle(newLastChar);
            currentCursorPos[0] = parseInt(newLastCharStyle.left) + parseInt(newLastCharStyle.width) + 1;
            if ((parseInt(newLastCharStyle.top) -6)% 7 != 0){
                currentCursorPos[1] = parseInt(newLastCharStyle.top) -1;
            } else{
                currentCursorPos[1] = parseInt(newLastCharStyle.top);
            }
        }
        document.getElementById("cursor").style.left = currentCursorPos[0] + "px";
        document.getElementById("cursor").style.top = currentCursorPos[1] + "px";
        return;
    } else if (!charWidths[keyPressed]){
        return;
    } 

    if (currentCursorPos[0] > 310 || keyPressed == "Enter"){
        currentCursorPos[0] = initialCursorPos[0];
        currentCursorPos[1] += 7; // Move down to the next line
        document.getElementById("cursor").style.top = currentCursorPos[1] + "px";
    }
    if ((keyPressed == "g" || keyPressed == "y" || keyPressed == "q" || keyPressed == "p" || keyPressed == ",")){
        moveDown = 1;
    }
    if(keyPressed == ","){
        moveOver = -1;
    }
    newLetter = document.createElement("div");
    newLetter.style.imageRendering = "pixelated";
    newLetter.style.position = "absolute";
    newLetter.style.width = charWidths[keyPressed] + "px";
    newLetter.style.height = "5px";
    newLetter.style.left = currentCursorPos[0] + moveOver + "px";
    newLetter.style.top = (currentCursorPos[1] + moveDown) + "px";
    if (keyPressed == "Enter") newLetter.ClassName = "Enter";
    
    moveDown = 0;
    switch(keyPressed){
        case " ":
            break;
        case "Tab":
            break;
        case "Enter":
            break;
        case ".":
            newLetter.style.backgroundImage = "url('../src/images/period.png')";
            break;
        case "?":
            newLetter.style.backgroundImage = "url('../src/images/qmark.png')";
            break;
        case "!":
            newLetter.style.backgroundImage = "url('../src/images/!.png')";
            break;
        case ",":
            newLetter.style.backgroundImage = "url('../src/images/,.png')";
            break;
        case "#":
            newLetter.style.backgroundImage = "url('../src/images/hashtag.png')";
            break;
        case "%":
            newLetter.style.backgroundImage = "url('../src/images/percent.png')";
            break;
        case "$":
            newLetter.style.backgroundImage = "url('../src/images/$.png')";
            break;
        case "(":
            newLetter.style.backgroundImage = "url('../src/images/(.png')";
            break;
        case ")":
            newLetter.style.backgroundImage = "url('../src/images/closedparen.png')";
            break;
        case "[":
            newLetter.style.backgroundImage = "url('../src/images/openBracket.png')";
            break;
        case "]":
            newLetter.style.backgroundImage = "url('../src/images/].png')";
            break;
        case "~":
            newLetter.style.backgroundImage = "url('../src/images/tilde.png')";
            break;
        case "/":
            newLetter.style.backgroundImage = "url('../src/images/slash.png')";
            break;
        case "\\":
            newLetter.style.backgroundImage = "url('../src/images/backslash.png')";
            break;
        case "{":
            newLetter.style.backgroundImage = "url('../src/images/openBrace.png')";
            break;
        case "}":
            newLetter.style.backgroundImage = "url('../src/images/}.png')";
            break;
        case "^":
            newLetter.style.backgroundImage = "url('../src/images/^.png')";
        case ":":
            newLetter.style.backgroundImage = "url('../src/images/colon.png')";
            break;
        case ";":
            newLetter.style.backgroundImage = "url('../src/images/;.png')";
            break;
        default:
        if(shiftOn || capsOn || !isNaN(parseInt(keyPressed))){
            newLetter.style.backgroundImage = "url('../src/images/" + keyPressed +".png')";   
        }
        else newLetter.style.backgroundImage = "url('../src/images/" + keyPressed +"l.png')";   
        break;
    }
    document.getElementById("currentNote").appendChild(newLetter);
    currentCursorPos[0] += (charWidths[keyPressed] + 1 + moveOver);
    document.getElementById("cursor").style.left = currentCursorPos[0]-1 + "px";
    
    moveOver = 0;
}