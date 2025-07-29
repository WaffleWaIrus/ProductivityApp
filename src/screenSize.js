
document.addEventListener('DOMContentLoaded', ()=>{
    init()
    fixScreenSize()
});
window.addEventListener('resize', fixScreenSize);
let allWidth;
let allHeight;

function init(){
    console.log("ran0");
    const all = document.getElementById("all");
    allWidth = parseInt(getComputedStyle(all).width);
    allHeight = parseInt(getComputedStyle(all).height);
    console.log("ran");
}
function fixScreenSize(){
    let screenRatio = window.innerWidth / window.innerHeight; //Ratio of the window
    const desiredRatio = allWidth / allHeight; //Ratio of the background
    let scaleFactor = screenRatio < desiredRatio ? Math.floor(window.innerWidth / allWidth): Math.floor(window.innerHeight / allHeight);
    console.log(window.innerWidth/allWidth);
    console.log("allwidth: " + allWidth);
    document.getElementById("all").style.zoom = scaleFactor*100 + "%";
}