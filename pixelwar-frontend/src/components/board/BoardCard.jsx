import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";

function BoardCard({ board }) {
  return (
    <Card>
      <div className='row no-gutters'>
        <div className='col-md-4'>
          <CardImg
            top
            width='100%'
            src={`${asset}/boards/${board.id}/thumbnail`}
            alt='Board image'
          />
        </div>
        <div className='col-md-8'>
          <CardBody>
            <CardTitle tag='h5'>{board.title}</CardTitle>
            <CardText>{board.description}</CardText>
          </CardBody>
        </div>
      </div>
    </Card>
  );
}

export default BoardCard;
