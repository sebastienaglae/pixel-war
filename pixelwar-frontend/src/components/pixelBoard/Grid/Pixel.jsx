import React, { useState, useEffect } from "react";
import "./Pixel.css";
import { socket } from "../../../socket";
import axios from "axios";

function Pixel(props) {
  const { x, y, boardData, selectedColor } = props;
  const [pixelColor, setPixelColor] = useState(
    boardData.board_history[y][x].color ?? "#fff"
  );
  const [isHover, setIsHover] = useState(false);

  // Function to handle pixel color update from socket event
  const handlePixelUpdate = (data) => {
    if (x === data.x && y === data.y) {
      setPixelColor(data.selectedColor);
    }
  };

  // Effect to handle socket events and axios request
  useEffect(() => {
    // Listen for pixel-updated event from socket
    socket.on("pixel-updated", handlePixelUpdate);

    // Cleanup function to remove socket event listener
    return () => {
      socket.off("pixel-updated", handlePixelUpdate);
    };
  }, []); // Empty dependency array to run effect only once on mount

  // Function to update pixel color locally and emit event to server
  const updatePixelColor = () => {
    setPixelColor(selectedColor);
    socket.emit("setPixelColor", boardData.id, {
      x: x,
      y: y,
      selectedColor: selectedColor,
    });

    // Update pixel color on server
    axios
      .put(`http://localhost:3001/update-pixel`, {
        boardId: boardData.id,
        x: x,
        y: y,
        color: selectedColor,
        author: boardData.author,
      })
      .then(() => {
        console.log("Pixel color updated on server");
      })
      .catch((error) => {
        console.error("Error editing board data:", error);
      });
  };

  return (
    <div
      className="pixel"
      style={{
        backgroundColor: isHover ? selectedColor : pixelColor,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={updatePixelColor}
    ></div>
  );
}

export default Pixel;
