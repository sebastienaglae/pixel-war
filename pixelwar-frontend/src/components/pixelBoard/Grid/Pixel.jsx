import { useState, useEffect } from "react";
import "./Pixel.css";
import { socket } from "../../../socket";

function Pixel(props) {
  const { x, y, selectedColor } = props;
  const [pixelColor, setPixelColor] = useState("#fff"); // white
  const [isHover, setIsHover] = useState(false);

  function update(data) {
    if (x === data["x"] && y === data["y"]) {
      setPixelColor(data["selectedColor"]);
    }
  }

  useEffect(() => {
    socket.on("pixel-updated", update);

    return () => {
      socket.off("pixel-updated", update);
    };
  }, []);

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
