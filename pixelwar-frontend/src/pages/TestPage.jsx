import { Button } from "reactstrap";
<<<<<<< HEAD
import { useContext } from "react";
import { ThemeContext } from "../App";

function TestPage() {
    const themeContext = useContext(ThemeContext);
    return (
      <div>
        <Button
          color='primary'
          onClick={() =>
            themeContext.theme == "light"
              ? themeContext.setTheme("dark")
              : themeContext.setTheme("light")
          }
        >
          {themeContext.theme}
        </Button>
      </div>
    );
=======
import SelectComponent from "@components/select/SelectComponent.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { apiURL } from "../socket";

function TestPage() {
  const [boardId, setBoardId] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  // useEffect to observe changes in boardId and navigate to BoardPage when boardId is not null
  useEffect(() => {
    if (boardId) {
      navigate(`/board/${boardId}`); // Navigate to BoardPage with the retrieved boardId
    }
  }, [boardId]); // Trigger effect when boardId or navigate changes

  return (
    <div style={{ width: "100%", height: "92%" }}>
      <div style={{ width: "100%", height: "15%" }}>
        <h1>Test Page</h1>
        <Button color="primary">Primary</Button>
      </div>
      <div style={{ width: "100%", height: "85%" }}>
        <SelectComponent setter={setBoardId} apiUrl={apiURL} />
      </div>
    </div>
  );
>>>>>>> d340ad7 (fix(front, api): handle socket disconnection and leave room in a better way)
}

export default TestPage;
