import { Button } from "reactstrap";
import Form from "@components/form/Form.jsx";
import { apiURL } from "../socket";

function CreatePage() {
  return (
    <div style={{ width: "100%", height: "92%" }}>
      <div style={{ width: "100%", height: "15%" }}>
        <h1>Create Page</h1>
        <Button color="primary">Primary</Button>
      </div>
      <div style={{ width: "100%", height: "85%" }}>
        <Form apiUrl={apiURL} />
      </div>
    </div>
  );
}

export default CreatePage;
