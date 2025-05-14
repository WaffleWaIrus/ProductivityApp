
document.addEventListener('DOMContentLoaded', ()=>{
    fixScreenSize()
    init();
});
window.addEventListener('resize', fixScreenSize);

function init(){
    for (item of document.querySelectorAll("#all div")){
        item.style.backgroundColor = item.id;
        console.log(item.id);
    }
}
function fixScreenSize(){
    const allWidth = getComputedStyle(document.getElementById("all")).width;
    const allHeight = getComputedStyle(document.getElementById("all")).height;

    //get the number of pixels used for the background and the height of the users screen and scale the background
    //TODO: don't get the height from "all" get it from the asset itself.
    screenRatio = window.innerWidth / window.innerHeight;
    sideToScaleBy = screenRatio >  1 ? window.innerHeight : window.innerWidth;
    denomToDivBy = screenRatio > 1 ? allHeight:allWidth;
    document.getElementById("all").style.transform =
    "scale(" + ((sideToScaleBy)
    /
    parseInt(denomToDivBy)) + ")";
    
}