import PixelBoardForm from "@components/admin/PixelBoardForm";
import { Container, Col } from "reactstrap";
import { useRequest } from "@hooks/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CreateBoardPage() {
  const initialData = {
    name: "Un mauvais titre :)",
    resolution: {
      x: "64",
      y: "64",
    },
    colors: ["#000A56"],
    delay: "5",
    creationDate: new Date(),
    endDate: new Date(),
    mode: "no-overwrite",
  };
  const navigate = useNavigate();
  const { loading, execute, error, success } = useRequest("/boards", {}, "post");

  const handleSubmit = (formData) => {
    execute("", {
      data: formData,
    });
  };

  useEffect(() => {
    if (success) {
      navigate("/admin");
    }
  }, [success]);

  return (
    <Container className='my-5' sm='12' md={{ size: 6, offset: 3 }}>
      <Col sm='12' md={{ size: 6, offset: 3 }}>
        <h2 className='text-center mb-5'>Créer un nouveau tableau</h2>
        <PixelBoardForm
          initialData={initialData}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </Col>
    </Container>
  );
}

export default CreateBoardPage;
