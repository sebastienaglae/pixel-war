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
  const [lastUpdate, setLastUpdate] = useState(null);
  const currAuthor = "visiteur_" + socket.id; // TODO: here set a way to retrieve username
  const history = useNavigate();

  useEffect(() => {
    return () => {
      socket.emit("leaveRoom", id);
    };
  }, [history, id]);

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
  }, [id]);

  useEffect(() => {
    if (boardData) socket.emit("joinBoard", boardData.id);
    if (socket.id) {
      // dont register visiteur_undefined
      axios
        .get(`http://localhost:3001/get-board/${id}`)
        .then((response) => {
          const contributor = response.data.board.contributors.find(
            (c) => c.author === currAuthor
          );
          if (contributor) {
            setLastUpdate(contributor.lastUpdate ?? null);
          }
        })
        .catch((error) => {
          console.error("Error fetching board data:", error);
        });
    }
  }, [boardData, currAuthor, id]);

  return boardData ? (
    <div className="pixelBoard">
      <div className="windows">
        <div className="gridNav">
          <Grid
            boardData={boardData}
            selectedColor={selectedColor}
            lastUpdate={lastUpdate}
            setLastUpdate={setLastUpdate}
            currAuthor={currAuthor}
          />
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
      <p> There is nothing to paint on {"😞"} ... </p>
    </>
  );
}

export default PixelBoardComponent;
