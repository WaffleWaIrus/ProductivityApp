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
class PixelParagraph extends HTMLElement{
    static shadow;
    static mutObserver;
    static width;
    static shadowDiv;
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});//create shadow DOM
        this.mutObserver = new MutationObserver(this.addLetters)
    }
    //runs each time the element is added to the DOM
    connectedCallback(){
        this.mutObserver.observe(this, {
            subtree: true,
            childList: true,
            characterData: true
        });
        this.addLetters();
    }
    disconnectedCallback(){
        this.mutObserver.disconnect();
    }
    //add the letters to the element
    addLetters(){
        this.shadowRoot.innerHTML = "";
        let potentialWidth =this.getBoundingClientRect().width; 
        this.width = potentialWidth >0? potentialWidth: this.parentElement.getBoundingClientRect().width;
        console.log(this.width);
        const height = this.style.height;
        let letters = this.innerHTML.split('');
        //make shadowDiv attatched to shadow
        this.shadowDiv = document.createElement("div");
        this.shadowDiv.style.position = "relative";
        this.shadowRoot.appendChild(this.shadowDiv);
        //go through each letter, append its pixelArt variant to shadowDiv
        for (let i=0; i< letters.length;i++){
            let letter = this.addLetter(letters[i]);
            this.shadowDiv.appendChild(letter);
        }
        this.style.display = "block"
        //if pose > width, move down a line
    }
    addLetter(letter){
    let moveOver = 0;
    let moveDown = 0;
    let currentCursorPos = [0,0];
    if (this.shadowDiv.childNodes.length > 0){
        let newLastChar = this.shadowDiv.lastChild;
        let newLastCharStyle = getComputedStyle(newLastChar);
        currentCursorPos[0] = parseInt(newLastCharStyle.left) + parseInt(newLastCharStyle.width) + 1;
        console.log("left: " + parseInt(newLastCharStyle.left) + " width: " + parseInt(newLastCharStyle.width))
        //if the top of the last character is not in line, move the cursor down one
        if ((parseInt(newLastCharStyle.top))% 7 != 0){
            currentCursorPos[1] = parseInt(newLastCharStyle.top) -1;
        } else{
            currentCursorPos[1] = parseInt(newLastCharStyle.top);
        }
    }
    //if the letter is not valid, forget abt this and move on.
    if (!charWidths[letter]){
        console.log("invalid character " + letter + "used");
        return;
    } 

    if (currentCursorPos[0] + charWidths[letter] > this.width){
        currentCursorPos[0] = 0
        currentCursorPos[1] += 7; // Move down to the next line
    }
    if ((letter == "g" || letter == "y" || letter == "q" || letter == "p" || letter == ",")){
        moveDown = 1;
    }
    if(letter == ","){
        moveOver = -1;
    }
    console.log(currentCursorPos[0]);
    let newLetter = document.createElement("div");
    newLetter.style.imageRendering = "pixelated";
    newLetter.style.position = "absolute";
    newLetter.style.height = "5px";
    newLetter.style.left = currentCursorPos[0] + moveOver + "px";
    newLetter.style.top = (currentCursorPos[1] + moveDown) + "px";
    newLetter.style.width = charWidths[letter] + "px";
    if (letter == ' ' && currentCursorPos[0] == 0)  "0px";
    
    moveDown = 0;
    switch(letter){
        case " ":
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
        if(/[a-z]/.test(letter)){  
            newLetter.style.backgroundImage = "url('../src/images/" + letter +"l.png')";  
        }
        else newLetter.style.backgroundImage = "url('../src/images/" + letter +".png')"; 
        break;
    }
    return newLetter
    }
}

customElements.define("pixel-p", PixelParagraph);