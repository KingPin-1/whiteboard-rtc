const express = require("express"); //Access
const socket = require("socket.io");

const app = express(); //Iniitialized and server ready
app.use(express.static("public"));

let port = 5000;
let server = app.listen(port , () => {
    console.log("Listening to Port " + port);   
})

let io = socket(server);    
io.on("connection" , (socket)=>{
    console.log("Made socket Connection");
    //data from front-end
    //received data
    socket.on("beginPath" , (data) => {
        //Transfer data here to all connected computers.
        io.sockets.emit("beginPath" , data);
    })

    socket.on("drawStroke" , (data) => {
        io.sockets.emit("drawStroke" , data);
    })

    socket.on("redoUndo" , (data)=>{
        io.sockets.emit("redoUndo",data);
    })
})