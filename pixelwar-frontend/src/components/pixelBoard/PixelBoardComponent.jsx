import { useState, useEffect } from "react";
import "./PixelBoardComponent.css";
import Grid from "./Grid/Grid";
import ColorPicker from "./ColorPicker/ColorPicker";
import StatsNav from "./StatsNav/StatsNav";
import axios from "axios";

function PixelBoardComponent(props) {
  const { id, user, apiUrl, socket } = props;
  const [selectedColor, setSelectedColor] = useState("#131313");
  const [boardData, setBoardData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [logs, setLogs] = useState([]);
  const currAuthor = user ?? "visiteur_" + socket.id; // TODO: here set a way to retrieve username

  const HandleSetLogs = (log) => {
    // Update logs state with the new log
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    // Fetch board data by ID
    axios
      .get(`${apiUrl}/get-board/${id}`)
      .then((response) => {
        setBoardData(response.data.board);
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

    // Subscribe to 'added-log' event once when component mounts
    socket.on("added-log", HandleSetLogs);
    // Clean up socket event listener when component unmounts
    return () => {
      socket.off("added-log", HandleSetLogs);
      socket.emit("leaveRoom", id);
    };
  }, []);

  useEffect(() => {
    if (boardData) {
      socket.emit("joinBoard", id);
    }
  }, [boardData]);

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
            apiUrl={apiUrl}
            socket={socket}
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
