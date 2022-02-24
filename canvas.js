let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//API
let tool = canvas.getContext("2d");

tool.strokeStyle = "black";
tool.lineWidth = "3";

let mouseDownFlag = false;

canvas.addEventListener("mousedown" , (e) => {
    mouseDownFlag = true;
    tool.beginPath();
    tool.moveTo(e.clientX , e.clientY);
})

canvas.addEventListener("mousemove" , (e) =>{
    if(mouseDownFlag){
        tool.lineTo(e.clientX , e.clientY);
        tool.stroke();  
    }
})

canvas.addEventListener("mouseup" , (e) => {
    mouseDownFlag = false;
})

