import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PixelBoardForm from "@components/admin/PixelBoardForm";
import { Container, Col } from "reactstrap";
import { useApi, useRequest } from "@hooks/api";

function EditBoardPage() {
  const [error, setError] = useState("");
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data } = useApi(`/boards/${boardId}`);
  const { success, execute } = useRequest(`/boards/${boardId}`, {}, "put");

  useEffect(() => {
  }, [data]);

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
        <h2 className='text-center mb-5'>Éditer PixelBoard</h2>
        {data && (
          <PixelBoardForm
            initialData={data}
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
