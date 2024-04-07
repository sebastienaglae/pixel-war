import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardFooter,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { asset } from "@hooks/api";

function PixelBoardCard({ board }) {
  const navigate = useNavigate();
  const handleViewBoard = () => {
    navigate(`/board/${board.id}`);
  };

  return (
    <Card className='mb-3' color='background'>
      <CardImg
        src={asset(`/boards/${board.id}/thumbnail`)}
        alt='Board Preview'
      />
      <CardBody>
        <CardTitle tag='h5'>{board.name}</CardTitle>
        <CardText>Démarré le {board.startAt}</CardText>
        <CardText>Nombre de pixel: {board.pixelsNumber}</CardText>
        <CardText>Statut: {board.status}</CardText>
        <Button onClick={handleViewBoard}>Voir</Button>
      </CardBody>
      <CardFooter>Par {board.owner}</CardFooter>
    </Card>
  );
}

export default PixelBoardCard;
