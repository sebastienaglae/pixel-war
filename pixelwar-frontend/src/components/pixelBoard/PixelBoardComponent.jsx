import { useEffect, useState } from "react";
import "./PixelBoardComponent.css";
import Grid from "./Grid/Grid";
import ColorPicker from "./ColorPicker/ColorPicker";
import StatsNav from "./StatsNav/StatsNav";

function PixelBoardComponent({ id }) {
  const computePixelSize = (rowCount) => {
    return Math.min(25, Math.floor((window.innerHeight * 0.7) / rowCount));
  };

  var data = {
    width: 50,
    height: 50,
    delay: 5,
    pixelSize: computePixelSize(50),
    colors: ["#131313", "#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  };

  const generateInitialGrid = (rows, cols, defaultColor) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = new Array(cols).fill(defaultColor);
      grid.push(row);
    }
    return grid;
  };

  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [boardData] = useState(data);
  const [grid, setGrid] = useState(
    generateInitialGrid(boardData.height, boardData.width, selectedColor)
  );
  const [logs, setLogs] = useState([]);
  const [canPlace, setCanPlace] = useState(false);

  useEffect(() => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[0][0] = "#fff";
      return newGrid;
    });
  }, [boardData, selectedColor]);

  const onCooldownComplete = () => {
    setCanPlace(true);
  };

  return (
    <div className='pixelBoard'>
      <div className='d-flex justify-content-center m-auto'>
        <Grid boardData={boardData} selectedColor={selectedColor} grid={grid} />
      </div>
      <div className='stats'>
        <StatsNav logs={logs} />
      </div>
      <ColorPicker
        colors={data.colors}
        picked={selectedColor}
        setPicked={setSelectedColor}
        delay={data.delay}
        canPlace={canPlace}
        onCooldownComplete={onCooldownComplete}
      />
    </div>
  );
}

export default PixelBoardComponent;
