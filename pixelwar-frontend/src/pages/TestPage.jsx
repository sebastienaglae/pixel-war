import { Button } from "reactstrap";
import PixelBoardComponent from "@components/pixelBoard/PixelBoardComponent.jsx";

function TestPage() {
  return (
    <div style={{ width: "100%", height: "92%" }}>
      <div style={{ width: "100%", height: "15%" }}>
        <h1>Test Page</h1>
        <Button color="primary">Primary</Button>
      </div>
      <div style={{ width: "100%", height: "85%" }}>
        <PixelBoardComponent />
      </div>
    </div>
  );
}

export default TestPage;
