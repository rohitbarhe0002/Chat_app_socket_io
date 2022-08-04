const express = require('express');
const app = express()
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methotds:["GET","POST"],
        
    },
})

io.on("connection", (socket) => {
    console.log(`user is connected, ${socket.id}`);

    socket.on("join_room",(data) => {
        socket.join(data);
        console.log(`user with Id: ${socket.id} joined room: ${data}`);
    })
  
    socket.on("send_message",(data)=> {
    socket.to(data.room).emit("receive_message",data);
    console.log(data,"kkkk")
    })
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})



server.listen(3002, () => {
    console.log("SERVER RUNNING");
})
