import { useState, useEffect } from "react";
import "./Pixel.css";
import { socket } from "../../../socket";
import axios from "axios";

function Pixel(props) {
  const { x, y, boardData, selectedColor } = props;
  const [pixelColor, setPixelColor] = useState(
    boardData.board_history[y][x].color ?? "#fff"
  ); // white
  const [isHover, setIsHover] = useState(false);

  function update(data) {
    if (x === data["x"] && y === data["y"]) {
      setPixelColor(data["selectedColor"]);
    }
  }

  useEffect(() => {
    axios
      .put(`http://localhost:3001/update-pixel`, {
        boardId: boardData.id,
        x: x,
        y: y,
        color: pixelColor,
        author: boardData.author,
      })
      .then((response) => {
        socket.on("pixel-updated", update);

        return () => {
          socket.off("pixel-updated", update);
        };
      }, [])
      .catch((error) => {
        console.error("Error editing board" + boardData.id + "data:", error);
      });
  });

  return (
    <div
      className="pixel"
      style={{
        backgroundColor: isHover ? selectedColor : pixelColor,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        socket.emit("setPixelColor", {
          x: x,
          y: y,
          selectedColor: selectedColor,
        });
      }}
    ></div>
  );
}

export default Pixel;
