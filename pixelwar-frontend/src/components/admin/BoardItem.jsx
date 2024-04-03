import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  CardTitle,
  CardImg,
} from "reactstrap";

function BoardItem({ data }) {
  let navigate = useNavigate();

  const handleView = () => {
    console.log("View action");
    navigate(`/board/${data.id}`);
  };

  const handleEdit = () => {
    console.log("Edit action");
    navigate(`/admin/edit-board/${data.id}`);
  };

  const handleDelete = () => {
    console.log("Delete action");
  };

  return (
    <Card className='d-flex flex-row' color='dark' text='white'>
      <CardImg
        variant='left'
        src={data.image || "https://picsum.photos/200"}
        alt='random'
        style={{ objectFit: "cover", width: "200px" }}
        className='rounded-start'
      />
      <div className='d-flex flex-column w-100'>
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{data.description}</CardText>
          <div className='mt-2 d-flex justify-content-end'>
            <Button color='success' onClick={handleView} className='ms-2'>
              Voir
            </Button>
            <Button color='primary' onClick={handleEdit} className='ms-2'>
              Modifier
            </Button>
            <Button color='danger' onClick={handleDelete} className='ms-2'>
              Supprimer
            </Button>
          </div>
        </CardBody>
        <CardFooter color='text-muted'>
          Dernière modification le {new Date(data.date).toLocaleDateString()}{" "}
          par {data.author}
        </CardFooter>
      </div>
    </Card>
  );
}

export default BoardItem;
