import { useEffect, useState } from "react";
import "./PixelBoardComponent.css";
import Grid from "@components/pixelBoard/Grid/Grid";
import ColorPicker from "@components/pixelBoard/ColorPicker/ColorPicker";
import StatsNav from "@components/pixelBoard/StatsNav/StatsNav";

function PixelBoardComponent({ id, loading }) {
  const computePixelSize = (rowCount, columnCount) => {
    const maxSizeBasedOnHeight = Math.floor(
      (window.innerHeight * 0.7) / rowCount
    );
    const maxSizeBasedOnWidth = Math.floor(
      (window.innerWidth * 0.7) / columnCount
    );

    return Math.min(25, maxSizeBasedOnHeight, maxSizeBasedOnWidth);
  };

  var data = {
    width: 50,
    height: 50,
    delay: 5,
    pixelSize: computePixelSize(50, 50),
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
  const [canPlace, setCanPlace] = useState(true);

  //oresize recompute pixel size
  useEffect(() => {
    const handleResize = () => {
      const newSize = computePixelSize(boardData.height, boardData.width);
      data.pixelSize = newSize;
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[0][0] = "#fff";
        return newGrid;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [boardData]);

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
    <div className='pixelBoard d-flex flex-column w-100 h-100'>
      <div className='d-flex justify-content-center m-auto'>
        <Grid boardData={boardData} selectedColor={selectedColor} grid={grid} />
      </div>
      <StatsNav logs={logs} />
      <ColorPicker
        colors={data.colors}
        picked={selectedColor}
        setPicked={setSelectedColor}
        delay={data.delay}
        canPlace={canPlace}
        onCooldownComplete={onCooldownComplete}
        loading={loading}
      />
    </div>
  );
}

export default PixelBoardComponent;
