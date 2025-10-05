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
let cssTemplate = `
    #outerShadowDiv{
        padding: var(--pixel-padding, 0px);
    }
`
class PixelParagraph extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});//create shadow DOM
        this.mutObserver = new MutationObserver(this.addLetters);
        this.currentCursorPos = [0,0];
        this.shadowDiv = document.createElement("div");
        this.outerShadowDiv = document.createElement("div");
        this.outerShadowDiv.id = "outerShadowDiv";
        this.shadowDiv.id = "shadowDiv";
        this.styleElem = document.createElement("style");
        this.bottom = 5;
        this.right =0;
    }
    //runs each time the element is added to the DOM
    connectedCallback(){
        // this.outerShadowDiv.style.padding = "10px";
        this.styleElem.innerHTML = cssTemplate;
        this.shadowRoot.appendChild(this.styleElem);
        this.shadowRoot.appendChild(this.outerShadowDiv);
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
        this.shadowDiv.innerHTML = "";
        let potentialWidth =this.getBoundingClientRect().width - 2*parseInt(getComputedStyle(this.styleElem).getPropertyValue("--pixel-padding"));
        this.width = potentialWidth >0? potentialWidth: this.parentElement.getBoundingClientRect().width;
        console.log("ahhhh: " + this.width);
        // let letters = this.innerHTML.split('');
        let words = this.innerHTML.split(' ');
        //make shadowDiv attatched to shadow
        this.shadowDiv.style.position = "relative";
        this.outerShadowDiv.appendChild(this.shadowDiv);
        for (let i=0; i< words.length; i++){
            this.addWord(words[i]);
        }
        this.style.display = "block";
        this.style.width = this.right + "px";
        this.shadowDiv.style.width = this.right + "px";
        this.style.height = this.bottom + "px";
        this.shadowDiv.style.height = this.bottom + "px";
    }
    addWord(word){
        let letterElements = [];
        let letters = word.split('');
        letterElements[0] = this.addLetter(letters[0]);
        let goOver = letterElements[0][1];
        let firstLeft = letterElements[0][2];
        for (let i=1; i< letters.length;i++){
            let letter = this.addLetter(letters[i]);
            letterElements[i] =  letter;
            if (letter[1]) goOver = true;
        }
        if(goOver){
            for (let i=0; i< letterElements.length; i++){
                letterElements[i][0].style.left = letterElements[i][2] -firstLeft + "px";
                letterElements[i][0].style.top = letterElements[i][3] + 7 + "px";
                this.shadowDiv.appendChild(letterElements[i][0]);
                if (i== letterElements.length - 1) {
                    this.currentCursorPos[0] = letterElements[i][2] -firstLeft +1;
                    this.currentCursorPos[1] = letterElements[i][3] + 7;
                    this.bottom = this.currentCursorPos[1] + 5;
                }
            }
        }else{
            for (let i=0; i< letterElements.length; i++){
                this.shadowDiv.appendChild(letterElements[i][0]);
            }
        }
        this.currentCursorPos[0] += 2;
    }
    addLetter(letter){
    let goOver = false;
    let left = 0;
    let moveOver = 0;
    let moveDown = 0;
    //if the letter is not valid, forget abt this and move on.
    if (!charWidths[letter]){
        console.log("invalid character " + letter + "used");
        return;
    } 

    if (this.currentCursorPos[0] + charWidths[letter] > this.width){
        goOver = true;
    }
    if ((letter == "g" || letter == "y" || letter == "q" || letter == "p" || letter == ",")){
        moveDown = 1;
    }
    if(letter == ","){
        moveOver = -1;
    }
    let newLetter = document.createElement("div");
    newLetter.style.imageRendering = "pixelated";
    newLetter.style.position = "absolute";
    newLetter.style.height = "5px";
    newLetter.style.left = this.currentCursorPos[0] + moveOver + "px";
    newLetter.style.top = (this.currentCursorPos[1] + moveDown) + "px";
    newLetter.style.width = charWidths[letter] + "px";
    left = this.currentCursorPos[0] + moveOver;
    let top = this.currentCursorPos[1] +moveDown;
    let width = charWidths[letter];
    this.currentCursorPos[0] = left + charWidths[letter] +1
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
        case "#":
            newLetter.style.backgroundImage = "url('../src/images/hashtag.png')";
            break;
        case "%":
            newLetter.style.backgroundImage = "url('../src/images/percent.png')";
            break;
        case ")":
            newLetter.style.backgroundImage = "url('../src/images/closedparen.png')";
            break;
        case "[":
            newLetter.style.backgroundImage = "url('../src/images/openBracket.png')";
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
        case ":":
            newLetter.style.backgroundImage = "url('../src/images/colon.png')";
            break;
        default:
        if(/[a-z]/.test(letter)){  
            newLetter.style.backgroundImage = "url('../src/images/" + letter +"l.png')";  
        }
        else newLetter.style.backgroundImage = "url('../src/images/" + letter +".png')"; 
        break;
    }
    if (left + width > this.right) this.right = left + width;
    return [newLetter, goOver, left,top];
    }
}

customElements.define("pixel-text", PixelParagraph);