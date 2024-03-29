import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import cors from "cors"; // Import cors package

const app = express();
const port = 3001;
const httpServer = createServer(app); // Create HTTP server

function generateBoard(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push({
        color: "#fff",
        lastSetter: null,
        lastUpdate: null,
      });
    }
    board.push(row);
  }
  return board;
}

// Array to store pixel boards data
let pixelBoards = [];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Use cors middleware

// Endpoint to handle creation of a new pixel board
app.post("/create-pixelboard", (req, res) => {
  const {
    name,
    width,
    height,
    author,
    overwrite,
    reinsert_delay,
    duration,
    creation_date,
  } = req.body;

  // Validate input data
  if (
    !width ||
    !height ||
    !author ||
    !name ||
    !creation_date ||
    !(duration > 0)
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log(overwrite);
  let newBoard = generateBoard(width, height);
  // Create new pixel board object
  const newPixelBoard = {
    id: uuidv4(), // Auto-generated ID for each pixel
    name,
    width: parseInt(width),
    height: parseInt(height),
    author,
    overwrite: overwrite,
    reinsert_delay: parseInt(reinsert_delay),
    duration: parseInt(duration),
    creation_date,
    board_history: newBoard,
    contributors: [],
  };

  // Add the new pixel board to the array
  pixelBoards.push(newPixelBoard);

  res.status(201).json({
    message: "Pixel board created successfully",
    pixelBoard: newPixelBoard,
  });
});

// Endpoint to handle editing of a pixel
app.put("/update-pixel", (req, res) => {
  const { boardId, x, y, color, author } = req.body;

  // Find the pixel board by ID
  const pixelBoard = pixelBoards.find((board) => board.id === boardId);

  if (!pixelBoard) {
    return res.status(404).json({ error: "Pixel board not found" });
  }

  // Validate input data
  if (x < 0 || x >= pixelBoard.width || y < 0 || y >= pixelBoard.height) {
    return res.status(400).json({ error: "Invalid pixel coordinates" });
  }

  // Update the corresponding pixel
  const pixel = pixelBoard.board_history[y][x];
  pixel.color = color;
  pixel.lastSetter = author;
  pixel.lastUpdate = new Date().toISOString();

  let contributor = pixelBoard.contributors.find(
    (contrib) => contrib.author === author
  );

  if (contributor) {
    contributor.author = author;
    contributor.lastUpdate = new Date().toISOString();
  } else {
    pixelBoard.contributors.push({
      author: author,
      lastUpdate: new Date().toISOString(),
    });
  }

  res.status(200).json({ message: "Pixel updated successfully", pixel });
});

// Endpoint pour récupérer les informations de tous les boards
app.get("/get-boards", (_, res) => {
  res.json({ boards: pixelBoards });
});

// Endpoint to get a specific board by ID
app.get("/get-board/:id", (req, res) => {
  const boardId = req.params.id;

  const board = pixelBoards.find((board) => board.id === boardId);

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  res.json({ board });
});

// Start server
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Socket
//const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Function to handle joining a board room
  const joinBoardRoom = (boardId) => {
    // Leave all rooms the socket is currently in
    Array.from(socket.rooms).forEach((room) => {
      if (room !== boardId && room !== socket.id) {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
      }
    });

    // Join the new board room
    socket.join(boardId);
    console.log(`User ${socket.id} joined board ${boardId}`);
  };

  // Event listener for joining a board room
  socket.on("joinBoard", joinBoardRoom);

  socket.on("leaveRoom", (boardId) => {
    socket.leave(boardId);
    console.log("User " + socket.id + " leaved.");
  });

  socket.on("setPixelColor", (boardId, data) => {
    io.to(boardId).emit("pixel-updated", data);
  });
});

io.listen(5173);
