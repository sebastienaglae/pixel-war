import Pixel from "./Pixel";
import "./Row.css";

function Row({ y, boardData, selectedColor, row, onPixelPlace }) {
  return (
    <div className='rowPixel'>
      {row.map((pixelColor, index) => (
        <Pixel
          key={index}
          x={index}
          y={y}
          boardData={boardData}
          selectedColor={selectedColor}
          color={pixelColor}
          onPixelPlace={onPixelPlace}
        />
      ))}
    </div>
  );
}

export default Row;
