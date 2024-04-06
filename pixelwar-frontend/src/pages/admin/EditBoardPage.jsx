import { useState, useEffect } from "react";
import PixelBoardForm from "@components/admin/PixelBoardForm";
import { Container, Col } from "reactstrap";

function EditBoardPage({ boardId }) {
  const [error, setError] = useState("");
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadedData = {
      title: "Titre Existant",
      size: "64",
      delay: "5",
      creationDate: new Date(),
      endDate: new Date(),
      mode: "no-overwrite",
    };

    setInitialData(loadedData);
  }, [boardId]);

  const handleSubmit = (formData) => {
    console.log("Mise à jour avec :", formData);
    setError("Une erreur s'est produite");
  };

  return (
    <Container className='my-5' sm='12' md={{ size: 6, offset: 3 }}>
      <Col sm='12' md={{ size: 6, offset: 3 }}>
        <h2 className='text-center mb-5'>Éditer PixelBoard</h2>
        {initialData && (
          <PixelBoardForm
            initialData={initialData}
            onSubmit={handleSubmit}
            error={error}
            isEdit={true}
          />
        )}
      </Col>
    </Container>
  );
}

export default EditBoardPage;
