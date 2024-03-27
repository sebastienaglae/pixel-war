import { useState } from "react";
import "./PixelBoardComponent.css";
import Grid from "./Grid/Grid";
import ColorPicker from "./ColorPicker/ColorPicker";
import StatsNav from "./StatsNav/StatsNav";

function PixelBoardComponent() {
  const [selectedColor, setSelectedColor] = useState("#131313");
  const width = 200;
  const height = 200;
  return (
    <div className="pixelBoard">
      <div className="windows">
        <div className="gridNav">
          <Grid width={width} height={height} selectedColor={selectedColor} />
        </div>
        <div className="stats">
          <StatsNav />
        </div>
      </div>
      <div className="colorPicker">
        <ColorPicker picked={selectedColor} setPicked={setSelectedColor} />
      </div>
    </div>
  );
}

export default PixelBoardComponent;
