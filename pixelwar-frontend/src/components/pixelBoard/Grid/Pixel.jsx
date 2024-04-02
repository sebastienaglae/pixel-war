import { useState } from "react";
import "./Pixel.css";

function Pixel({ selectedColor, color, x, y, boardData }) {
  const [isHover, setIsHover] = useState(false);

  const submitPixelColor = () => {
    console.log(
      "Submit pixel color at x:",
      x,
      "y:",
      y,
      "color:",
      selectedColor
    );
  };

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
      onClick={submitPixelColor}
    ></div>
  );
}

export default Pixel;
