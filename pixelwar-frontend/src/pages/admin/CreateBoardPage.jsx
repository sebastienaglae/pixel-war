import { useState } from "react";
import PixelBoardForm from "@components/admin/PixelBoardForm";
import { Container, Col } from "reactstrap";

function CreateBoardPage() {
  const [error, setError] = useState("");
  const handleSubmit = (formData) => {
    console.log("Création avec :", formData);
    setError("Une erreur s'est produite");
  };

  return (
    <Container className='my-5' sm='12' md={{ size: 6, offset: 3 }}>
      <Col sm='12' md={{ size: 6, offset: 3 }}>
        <h2 className='text-center mb-5'>Créer un nouveau tableau</h2>
        <PixelBoardForm
          initialData={{}}
          onSubmit={handleSubmit}
          error={error}
        />
      </Col>
    </Container>
  );
}

export default CreateBoardPage;
