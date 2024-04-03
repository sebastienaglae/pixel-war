import { useState, useEffect } from "react";
import axios from "axios";
import "./SelectComponent.css";

function SelectComponent(props) {
  const { setter, apiUrl } = props;
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch all board names
    axios
      .get(`${apiUrl}/get-boards`)
      .then((response) => {
        setBoards(response.data.boards);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }, []);

  const handleBoardClick = (boardId) => {
    setter(boardId);
  };

  return (
    <div className="select-component">
      <h2>Select Board</h2>
      <ul>
        {boards.map((board) => (
          <li key={board.id} onClick={() => handleBoardClick(board.id)}>
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectComponent;
