let toolsContainer = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let pencilOptionsContainer = document.querySelector(".pencil-options-container");
let eraserOptionsContainer = document.querySelector(".eraser-options-container");
let pencilImage = document.querySelector(".pencil-image");
let eraserImage = document.querySelector(".eraser-image");
let optionsFlag = true;
let eraserFlag = false;
let pencilFlag = false;

optionsContainer.addEventListener("click" , (e) => {
    optionsFlag = !optionsFlag;

    if(!optionsFlag) openTools();
    else closeTools();
})

function openTools(){
    let iconElem = optionsContainer.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-xmark");
    toolsContainer.style.display = "flex";
}

function closeTools(){
    let iconElem = optionsContainer.children[0];
    iconElem.classList.remove("fa-xmark");
    iconElem.classList.add("fa-bars");
    toolsContainer.style.display = "none";
    pencilOptionsContainer.style.display = "none";
    eraserOptionsContainer.style.display = "none";
}

pencilImage.addEventListener("click" , (e) => {
    pencilFlag = !pencilFlag;
    if(!pencilFlag) pencilOptionsContainer.style.display = "block";
    else    pencilOptionsContainer.style.display = "none";
})

eraserImage.addEventListener("click" , (e) => {
    eraserFlag = !eraserFlag;
    if(!eraserFlag) eraserOptionsContainer.style.display = "flex";
    else    eraserOptionsContainer.style.display = "none";
})