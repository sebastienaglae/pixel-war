import PixelBoardForm from "@components/admin/PixelBoardForm";
import { Card, CardBody, Container, Col } from "reactstrap";
import { useRequest } from "@hooks/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const initialData = {
    name: "Un bon titre :)",
    resolution: {
      x: 64,
      y: 64,
    },
    colors: ["#1E5A56"],
    delay: 5,
    creationDate: new Date(),
    endDate: new Date(),
    mode: "no-overwrite",
  };
  const navigate = useNavigate();
  const { loading, execute, error, success } = useRequest(
    "/boards",
    {},
    "post"
  );

  const handleSubmit = (formData) => {
    execute("", {
      data: formData,
    });
  };

  useEffect(() => {
    if (success) {
      navigate("/boards");
    }
  }, [success]);

  return (
    <Container className='my-5'>
      <Col sm='12' md={{ size: 8, offset: 2 }}>
        <Card className='bg-dark d-flex mx-auto my-auto'>
          <CardBody>
            <h2 className='text-center mb-5'>Créer un nouveau tableau</h2>
            <PixelBoardForm
              initialData={initialData}
              onSubmit={handleSubmit}
              error={error}
              loading={loading}
            />
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
}

export default CreatePage;
