const http = require("http");
const express = require("express");
const cors = require("cors");
const server = http.createServer(app);
const socketIO = require("socket.io") (http,{
  cors:{
      origin:"https://chat-app-xy5k.vercel.app/"
  }
});

const app = express();
const port = 4500;

const users = {};

app.use(cors(
  {
    origin : ["https://chat-app-xy5k.vercel.app/"],
    methods:["POST","GET"],
    credentials:true
  }
));


app.get("/", (req, res) => {
  res.send("HELLO, IT'S WORKING");
});



const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on('joined', ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined `);
    socket.broadcast.emit('userJoined', { user: "Admin", message: ` ${users[socket.id]} has joined` });
    socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]} ` })
  })

  socket.on('message', ({ message, id }) => {
    io.emit('sendMessage', { user: users[id], message, id });
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
    console.log(`user left`);
  })
});

server.listen(port, () => {
  console.log(`Working on port ${port}`);
});
