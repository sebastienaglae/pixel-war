import Pixel from "./Pixel";
import "./Row.css";

function Row(props) {
  const {
    y,
    boardData,
    selectedColor,
    lastUpdate,
    setLastUpdate,
    currAuthor,
    setLogs,
  } = props;
  let pixels = [];
  for (let i = 0; i < boardData.width; i++) {
    pixels.push(
      <Pixel
        key={i}
        x={i}
        y={y}
        boardData={boardData}
        selectedColor={selectedColor}
        lastUpdate={lastUpdate}
        setLastUpdate={setLastUpdate}
        currAuthor={currAuthor}
        setLogs={setLogs}
      />
    );
  }
  return <div className="rowPixel">{pixels}</div>;
}

export default Row;
