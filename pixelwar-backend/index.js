import { Server } from "socket.io";
import { createServer } from "http";

//const httpServer = createServer();
const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("setPixelColor", (data) => {
    console.log("data from client", data);
    io.emit("pixel-updated", data);
  });
});

//io.listen(3001);
