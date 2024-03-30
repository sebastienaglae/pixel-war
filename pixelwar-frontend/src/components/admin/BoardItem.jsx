import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BoardItem({ data }) {
  let navigate = useNavigate();

  const handleView = () => {
    console.log("View action");
    navigate(`/board/${data.id}`);
  };

  const handleEdit = () => {
    console.log("Edit action");
    navigate(`/admin/edit/${data.id}`);
  };

  const handleDelete = () => {
    console.log("Delete action");
  };

  return (
    <Card className='d-flex flex-row' bg='dark' text='white'>
      <Card.Img
        variant='left'
        src={data.image || "https://picsum.photos/200"}
        alt='random'
        style={{ objectFit: "cover", width: "200px" }}
        className='rounded-start'
      />
      <div className='d-flex flex-column w-100'>
        <Card.Header>
          <Card.Title>{data.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{data.description}</Card.Text>
          <div className='mt-2 d-flex justify-content-end'>
            <Button variant='success' onClick={handleView} className='ms-2'>
              Voir
            </Button>
            <Button variant='primary' onClick={handleEdit} className='ms-2'>
              Modifier
            </Button>
            <Button variant='danger' onClick={handleDelete} className='ms-2'>
              Supprimer
            </Button>
          </div>
        </Card.Body>
        <Card.Footer className='text-muted'>
          Dernière modification le {new Date(data.date).toLocaleDateString()}{" "}
          par {data.author}
        </Card.Footer>
      </div>
    </Card>
  );
}

export default BoardItem;
