import { useState, useEffect } from "react";
import "./PixelBoardComponent.css";
import Grid from "./Grid/Grid";
import ColorPicker from "./ColorPicker/ColorPicker";
import StatsNav from "./StatsNav/StatsNav";
import axios from "axios";

function PixelBoardComponent(props) {
  const { id } = props;
  const [selectedColor, setSelectedColor] = useState("#131313");
  const [boardData, setBoardData] = useState(null);

  useEffect(() => {
    // Fetch board data by ID
    axios
      .get(`http://localhost:3001/get-board/${id}`)
      .then((response) => {
        setBoardData(response.data.board);
      })
      .catch((error) => {
        console.error("Error fetching board data:", error);
      });
  }, [id]); // Trigger fetch when ID changes

  const width = boardData ? boardData.width : 3;
  const height = boardData ? boardData.height : 3;

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
