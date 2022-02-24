let toolsContainer = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let pencilOptionsContainer = document.querySelector(".pencil-options-container");
let eraserOptionsContainer = document.querySelector(".eraser-options-container");
let pencilImage = document.querySelector(".pencil-image");
let eraserImage = document.querySelector(".eraser-image");
let sticky = document.querySelector(".notes-image");
let upload = document.querySelector(".upload-image");
let optionsFlag = true;
let eraserFlag = false;
let pencilFlag = false;

// When document is loaded. 

document.onload = setDefault();
function setDefault(){
    pencilOptionsContainer.style.display = "none";
    eraserOptionsContainer.style.display = "none";
}


// For options button. 

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

// For pencil tool. 

pencilImage.addEventListener("click" , (e) => {
    pencilFlag = !pencilFlag;
    if(!pencilFlag) pencilOptionsContainer.style.display = "block";
    else    pencilOptionsContainer.style.display = "none";
})

// For eraser tool. 

eraserImage.addEventListener("click" , (e) => {
    eraserFlag = !eraserFlag;
    if(!eraserFlag) eraserOptionsContainer.style.display = "flex";
    else    eraserOptionsContainer.style.display = "none";
})

//For upload tool
upload.addEventListener("click" , (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change" , (e) =>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyContainer = document.createElement("div");
        stickyContainer.setAttribute("class" ,"sticky-notes-container");
        stickyContainer.innerHTML = `
            <div class="header">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="content-container">
                <img src = "${url}" class ="uploaded-image">
            </div>
            `;
        document.body.appendChild(stickyContainer);

        let remove = stickyContainer.querySelector(".remove");
        let minimize = stickyContainer.querySelector(".minimize");
        stickyActions(remove , minimize , stickyContainer);

        stickyContainer.onmousedown = function(event) {
            dragNDrop(stickyContainer,event);
        };
        
        stickyContainer.ondragstart = function() {
            return false;
        };

    })
})

//For Sticky Notes
sticky.addEventListener("click" , (e) => {
    let stickyContainer = document.createElement("div");
    stickyContainer.setAttribute("class" ,"sticky-notes-container");
    stickyContainer.innerHTML = `
    <div class="header">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="content-container">
        <textarea></textarea>
    </div>
    `;
    document.body.appendChild(stickyContainer);

    let remove = stickyContainer.querySelector(".remove");
    let minimize = stickyContainer.querySelector(".minimize");
    stickyActions(remove , minimize , stickyContainer);

    stickyContainer.onmousedown = function(event) {
        dragNDrop(stickyContainer,event);
      };
    
    stickyContainer.ondragstart = function() {
        return false;
      };
})


//DRag and drop functionality of sticky notes.
function dragNDrop(element,event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        moveAt(event.pageX, event.pageY);
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
        document.addEventListener('mousemove', onMouseMove);
        element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };
}

//minimize and remove of sticky notes.
function stickyActions(remove , minimize , stickyContainer){
    remove.addEventListener("click",(e)=>{
        stickyContainer.remove();
    })

    minimize.addEventListener("click" , (e)=>{
        let content = stickyContainer.querySelector(".content-container");
        let display = getComputedStyle(content).getPropertyValue("display");
        console.log(display);
        if(display == "none") content.style.display = "block";
        else  content.style.display = "none";
    })
}
