import { useEffect, useState } from "react";
import "./PixelBoardComponent.css";
import Grid from "./Grid/Grid";
import ColorPicker from "./ColorPicker/ColorPicker";
import StatsNav from "./StatsNav/StatsNav";
import PixelSocket from "../../api/PixelSocket";

let socket = null;

function PixelBoardComponent({ id, colorTable }) {
  const [size, setSize] = useState([50, 50]); // [width, height]
  const computePixelSize = (rowCount) => {
    return Math.min(25, Math.floor((window.innerHeight * 0.7) / rowCount));
  };
  const [delay, setDelay] = useState(0);
  const socketUrl = `ws://localhost:3000/boards-ws/${id}`;
  if (socket === null || socket.url !== socketUrl) {
    if (socket !== null) {
      socket.close();
    }
    socket = new PixelSocket(socketUrl, colorTable);
  }
  const resizeGrid = (width, height) => {
    if (size[0] === width && size[1] === height) {
      return;
    }
    setSize([width, height]);
    setGrid((prevGrid) => {
      const newGrid = new Array(height).fill(null).map(() => new Array(width).fill("#FFFFFF"));
      for (let y = 0; y < Math.min(height, size[1]); y++) {
        for (let x = 0; x < Math.min(width, size[0]); x++) {
          newGrid[y][x] = prevGrid[y][x];
        }
      }
      return newGrid;
    });
  };
  socket.callback = {
    onResize: (data) => {
      resizeGrid(data.x, data.y);
    },
    onPixelUpdate: (data) => {
      const { x, y, color } = data;
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[y][x] = colorTable[color];
        return newGrid;
      });
    },
    onHeaderUpdate: (data) => {
      console.log('onHeaderUpdate', data);
    },
    onDelete: () => {
      console.log('onDelete');
    },
    onPixelsData: (width, height, pixels) => {
      resizeGrid(width, height);
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            newGrid[y][x] = colorTable[pixels[y * width + x]];
          }
        }
        return newGrid;
      });
    },
    onPersonalDelay: (delay) => {
      console.log('onPersonalDelay', delay);
      if (delay > 0) {
        setDelay(delay);
      }
    }
  }
  const colorPalette = new Array();
  for (let i = 1; i < colorTable.length; i++) {
    colorPalette.push(colorTable[i]);
  }

  var data = {
    width: size[0],
    height: size[1],
    pixelSize: computePixelSize(size[1]),
    colors: colorPalette
  };

  const generateInitialGrid = (rows, cols, defaultColor) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = new Array(cols).fill(defaultColor);
      grid.push(row);
    }
    return grid;
  };

  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [boardData] = useState(data);
  const [grid, setGrid] = useState(
    generateInitialGrid(boardData.height, boardData.width, "#FFFFFF")
  );
  const [logs, setLogs] = useState([]);

  const onPixelPlace = (x, y) => {
    if (delay > 0) {
      return;
    }
    console.log('onPixelPlace', x, y, selectedColor, colorTable.indexOf(selectedColor));
    socket.setPixel(x, y, colorPalette.indexOf(selectedColor));
  };

  // decrement delay every second
  useEffect(() => {
    if (delay > 0) {
      const interval = setInterval(() => {
        setDelay((prevDelay) => prevDelay - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [delay]);
  
  return (
    <div className='pixelBoard'>
      <div className='d-flex justify-content-center m-auto'>
        <Grid boardData={boardData} delay={delay} selectedColor={selectedColor} grid={grid} onPixelPlace={onPixelPlace} />
      </div>
      <div className='stats'>
        <StatsNav logs={logs} />
      </div>
      <ColorPicker
        colors={data.colors}
        picked={selectedColor}
        setPicked={setSelectedColor}
        delay={delay}
      />
    </div>
  );
}

export default PixelBoardComponent;
