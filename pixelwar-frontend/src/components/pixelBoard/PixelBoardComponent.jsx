import { useState, useEffect } from "react";
import "./PixelBoardComponent.css";
import Grid from "./Grid/Grid";
import ColorPicker from "./ColorPicker/ColorPicker";
import StatsNav from "./StatsNav/StatsNav";
import axios from "axios";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";

function PixelBoardComponent(props) {
  const { id } = props;
  const [selectedColor, setSelectedColor] = useState("#131313");
  const [boardData, setBoardData] = useState(null);

  const history = useNavigate();

  useEffect(() => {
    return () => {
      socket.emit("leaveRoom", id);
    };
  }, [history]);

  useEffect(() => {
    // Fetch board data by ID
    if (!boardData) {
      axios
        .get(`http://localhost:3001/get-board/${id}`)
        .then((response) => {
          setBoardData(response.data.board);
        })
        .catch((error) => {
          console.error("Error fetching board data:", error);
        });
    }
  }, [id]); // Trigger fetch when ID changes

  useEffect(() => {
    if (boardData) socket.emit("joinBoard", boardData.id);
  }, [boardData]);

  return boardData ? (
    <div className="pixelBoard">
      <div className="windows">
        <div className="gridNav">
          <Grid boardData={boardData} selectedColor={selectedColor} />
        </div>
        <div className="stats">
          <StatsNav />
        </div>
      </div>
      <div className="colorPicker">
        <ColorPicker picked={selectedColor} setPicked={setSelectedColor} />
      </div>
    </div>
  ) : (
    <>
      <p> There is nothing </p>
    </>
  );
}

export default PixelBoardComponent;
