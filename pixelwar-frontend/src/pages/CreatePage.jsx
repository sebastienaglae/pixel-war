import { Button } from "reactstrap";
import Form from "@components/form/Form.jsx";

function TestPage() {
  return (
    <div style={{ width: "100%", height: "92%" }}>
      <div style={{ width: "100%", height: "15%" }}>
        <h1>Create Page</h1>
        <Button color="primary">Primary</Button>
      </div>
      <div style={{ width: "100%", height: "85%" }}>
        <Form />
      </div>
    </div>
  );
}

export default TestPage;
