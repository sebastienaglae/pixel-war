import { useState } from "react";
import PixelBoardForm from "@components/admin/PixelBoardForm";
import { Card, CardBody, Container, Col } from "reactstrap";

function CreatePage() {
  const [error, setError] = useState(null);

  const handleSubmit = (formData) => {
    console.log("Form submitted successfully with data:", formData);
  };

  return (
    <Container className='my-5'>
      <Col sm='12' md={{ size: 8, offset: 2 }}>
        <Card className='bg-dark d-flex mx-auto my-auto'>
          <CardBody>
            <h2 className='text-center mb-5'>Créer un nouveau tableau</h2>
            <PixelBoardForm
              initialData={{}}
              onSubmit={handleSubmit}
              error={error}
            />
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
}

export default CreatePage;
