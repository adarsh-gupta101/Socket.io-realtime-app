const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
    console.log("connected")
    
    socket.on('message', message => {
        console.log('Message: ' + message)
        socket.broadcast.emit('message', message)
      })    
     socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
});

server.listen(3000);