
document.addEventListener('DOMContentLoaded', ()=>{
    fixScreenSize()
});
window.addEventListener('resize', fixScreenSize);

const allWidth = parseInt(getComputedStyle(document.getElementById("all")).width);
const allHeight = parseInt(getComputedStyle(document.getElementById("all")).height);

function fixScreenSize(){
    //get the number of pixels used for the background and the height of the users screen and scale the background
    //TODO: don't get the height from "all" get it from the asset itself.
    screenRatio = window.innerWidth / window.innerHeight; //Ratio of the window
    desiredRatio = allWidth / allHeight; //Ratio of the background
    scaleFactor = screenRatio < desiredRatio ? Math.floor(window.innerWidth / allWidth) : Math.floor(window.innerHeight / allHeight);
    document.getElementById("all").style.transform = 
    "scale(" + scaleFactor +")";
    console.log("ran on notes")
}