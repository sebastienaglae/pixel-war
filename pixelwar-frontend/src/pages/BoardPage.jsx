import { Button } from "reactstrap";
import PixelBoardComponent from "@components/pixelBoard/PixelBoardComponent.jsx";
import { useParams } from "react-router-dom";
import { apiURL } from "../socket";
import { socket } from "../socket";

function BoardPage() {
  const { id } = useParams(); // Access id from URL
  return (
    <div style={{ width: "100%", height: "92%" }}>
      <div style={{ width: "100%", height: "15%" }}>
        <h1>Board Page</h1>
        <Button color="primary">Primary</Button>
      </div>
      <div style={{ width: "100%", height: "85%" }}>
        <PixelBoardComponent
          id={id}
          user={undefined}
          apiUrl={apiURL}
          socket={socket}
        />
      </div>
    </div>
  );
}

export default BoardPage;
