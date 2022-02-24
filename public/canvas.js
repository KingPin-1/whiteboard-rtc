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

let download = document.querySelector(".download-image");
let undo = document.querySelector(".undo-image");
let redo = document.querySelector(".redo-image");

let undoRedoTracker = [] ; // keeps all actions performed 
let tracker = 0 ; //which action from tracker array

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

undo.addEventListener("click" , (e) => {
    if( tracker > 0 ) tracker--;
    // console.log(tracker);
    let data = {
        trackValue : tracker , 
        undoRedoTracker
    } 
    socket.emit("redoUndo",data);
    // undoRedoCanvas(trackObj);
})

redo.addEventListener("click" , (e) => {
    if( tracker < undoRedoTracker.length - 1 ) tracker++;
    let data = {
        trackValue : tracker , 
        undoRedoTracker
    } 
    socket.emit("redoUndo",data);
    // undoRedoCanvas(trackObj);
})

function undoRedoCanvas(trackObj){
    tracker = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[tracker];
    // console.log(tracker);
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img ,0 ,0 , canvas.width , canvas.height);
    }
}


pencilColorAll.forEach(colorElem => {
    colorElem.addEventListener("click" , (e) =>{
        let chosenColor = colorElem.classList[1];
        pencilColor = chosenColor;
        tool.strokeStyle = chosenColor;
    })
})

pencilWidthElem.addEventListener("change" , (e) =>{
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth;
})

eraserWidthElem.addEventListener("change" , (e) =>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraserImage.addEventListener("click" , (e)=>{
    if(eraserFlag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }else{
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth;
    }
})

let mouseDownFlag = false;

canvas.addEventListener("mousedown" , (e) => {
    mouseDownFlag = true;
    // beginPath({
    //     x:e.clientX ,
    //     y:e.clientY
    // })
    let data = {
        x:e.clientX ,
        y:e.clientY
    }
    //send data to server
    socket.emit("beginPath" , data);
    
})
canvas.addEventListener("mousemove" , (e) =>{
    if(mouseDownFlag){
        let data = {
            x:e.clientX ,
            y:e.clientY ,
            color : eraserFlag ? eraserColor : pencilColor ,
            width : eraserFlag ? eraserWidth : pencilWidth
        }
        socket.emit("drawStroke" , data);
    }
})
canvas.addEventListener("mouseup" , (e) => {
    mouseDownFlag = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    tracker = undoRedoTracker.length-1;
})

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x , strokeObj.y);
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x , strokeObj.y);
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.stroke();
}

download.addEventListener("click" , (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "myBoard.jpg";
    a.click();
})

socket.on("beginPath" , (data) =>{
    beginPath(data);
})
socket.on("drawStroke", (data) =>{
    drawStroke(data);
})

socket.on("redoUndo",(data)=>{
    undoRedoCanvas(data);
})