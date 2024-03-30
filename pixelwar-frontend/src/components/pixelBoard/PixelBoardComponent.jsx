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
  const [logs, setLogs] = useState([]);
  const currAuthor = "visiteur_" + socket.id; // TODO: here set a way to retrieve username
  const history = useNavigate();

  const HandleSetLogs = (log) => {
    console.log("im here: ", log);
    // Update logs state with the new log
    setLogs((prevLogs) => [...prevLogs, log]);
  };

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

  // Subscribe to 'added-log' event once when component mounts
  useEffect(() => {
    socket.on("added-log", HandleSetLogs);

    // Clean up socket event listener when component unmounts
    return () => {
      socket.off("added-log", HandleSetLogs);
    };
  }, []);

  useEffect(() => {
    if (boardData) {
      socket.emit("joinBoard", boardData.id);
    }
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
            setLogs={HandleSetLogs}
          />
        </div>
        <div className="stats">
          <StatsNav logs={logs} />
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
