import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function PixelBoardCard({ board }) {
  const navigate = useNavigate();
  const handleViewBoard = () => {
    navigate(`/board/${board.id}`);
  };

  return (
    <Card className='mb-3' color='background'>
      <CardImg src={board.previewImage} alt='Board Preview' />
      <CardBody>
        <CardTitle tag='h5'>{board.title}</CardTitle>
        <CardText>Date Created: {board.dateCreated}</CardText>
        <CardText>Number of Pixels: {board.pixelsNumber}</CardText>
        <CardText>Status: {board.status}</CardText>
        <Button onClick={handleViewBoard}>Voir</Button>
      </CardBody>
    </Card>
  );
}

export default PixelBoardCard;
