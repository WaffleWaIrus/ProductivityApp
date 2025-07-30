
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
    const body = document.querySelector("body");
    const html = document.querySelector("html");
    allWidth = parseInt(getComputedStyle(all).width);
    allHeight = parseInt(getComputedStyle(all).height);
    all.style.backgroundRepeat = "no-repeat";
    all.style.imageRendering = "pixelated";
    all.style.backgroundSize = "cover";
    all.style.willChange = "transform";
    body.style.display = "flex";
    body.style.alignItems = "center";
    body.style.justifyContent = "center";
    body.style.height = "100%";
    body.style.width = "100%";
    html.style.height = "100%";
    html.style.width = "100%";

}
function fixScreenSize(){
    let screenRatio = window.innerWidth / window.innerHeight; //Ratio of the window
    const desiredRatio = allWidth / allHeight; //Ratio of the background
    let scaleFactor = screenRatio < desiredRatio ? Math.floor(window.innerWidth / allWidth): Math.floor(window.innerHeight / allHeight);
    console.log(window.innerWidth/allWidth);
    console.log("allwidth: " + allWidth);
    document.getElementById("all").style.zoom = scaleFactor*100 + "%";
}