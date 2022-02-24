let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//API
let tool = canvas.getContext("2d");

let pencilColorAll = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");

let pencilColor = "black";
let eraserColor = "white";
let pencilWidth = pencilWidthElem.value ;
let eraserWidth = eraserWidthElem.value ;

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

pencilColorAll.forEach(colorElem => {
    colorElem.addEventListener("click" , (e) =>{
        let chosenColor = colorElem.classList[1];
        pencilColor = chosenColor;
        tool.strokeStyle = chosenColor;
    })
})

let mouseDownFlag = false;

canvas.addEventListener("mousedown" , (e) => {
    mouseDownFlag = true;
    beginPath({
        x:e.clientX ,
        y:e.clientY
    })
    
})
canvas.addEventListener("mousemove" , (e) =>{
    if(mouseDownFlag){
        drawStroke({
            x:e.clientX ,
            y:e.clientY
        })
    }
})
canvas.addEventListener("mouseup" , (e) => {
    mouseDownFlag = false;
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x , strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x , strokeObj.y);
    tool.stroke();
}