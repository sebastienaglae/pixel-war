import { useState } from "react";
import "./Pixel.css";

function Pixel({ selectedColor, color, x, y, boardData, onPixelPlace }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className='pixel'
      style={{
        backgroundColor: isHover ? selectedColor : color,
        width: boardData.pixelSize + "px",
        height: boardData.pixelSize + "px",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => onPixelPlace(x, y)}
    ></div>
  );
}

export default Pixel;
