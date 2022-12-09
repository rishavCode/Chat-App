const express=require('express')
const path=require('path')
const http=require('http')
const app=express()//app is just a function for express
const server = http.createServer(app);//we are putting  express app into request listener 
const { Server } = require("socket.io");//server is constructor it will ivolve http server to web socket
const { Socket } = require('dgram');
const { send } = require('process');
const io = new Server(server);

app.use('/',express.static(path.join(__dirname,'public')));
const users = {};
io.on('connection',(socket)=>{
    socket.on("send-msg" , (data) => {
      console.log(`data from ${socket.id} ${data.msg}`);
      io.emit('receive-msg',{
        msg:data.msg,
        username:users[socket.id]
      })
    });
    socket.on('login',(data)=>{
        users[socket.id]=data.username;

    })
})
const port=3000;
server.listen(port,()=>{
    console.log(`Chatting server is up and running at ${port} port`);
})