import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Row,
  Col,
  Placeholder,
} from "reactstrap";
import PixelBoardCard from "./PixelBoardCard";

function BoardGrid({ userBoards, totalPixels, loading = true }) {
  return (
    <Card color='background-secondary'>
      <CardHeader>
        <strong>PixelBoards</strong>
      </CardHeader>
      {/* <Col sm={4} className='pt-2 ps-3'>
        <Card className='my-2 p-2 text-bold' color='background'>
          <CardText>
            <Placeholder animation={loading ? null : "wave"}>
              <strong>Total Pixels: {totalPixels}</strong>
            </Placeholder>
          </CardText>
        </Card>
      </Col> */}
      <CardBody>
        <Row>
          {userBoards && userBoards.contributions.map((board) => (
            <Col sm={4} key={board.id}>
              <PixelBoardCard board={board} />
            </Col>
          ))}
          {
            userBoards && userBoards.contributions && 
              <div> Vous n'avez pas de contributions </div>
          }
        </Row>
      </CardBody>
    </Card>
  );
}

export default BoardGrid;
