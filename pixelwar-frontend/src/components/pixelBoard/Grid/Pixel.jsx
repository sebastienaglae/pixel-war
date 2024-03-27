import { useState } from "react";
import "./Pixel.css";

function Pixel(props) {
  const { selectedColor } = props;
  const [pixelColor, setPixelColor] = useState("#fff"); // white
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="pixel"
      style={{
        backgroundColor: isHover ? selectedColor : pixelColor,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setPixelColor(selectedColor)}
    ></div>
  );
}

export default Pixel;
