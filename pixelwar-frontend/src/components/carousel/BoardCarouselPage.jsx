import { Row, Col } from "reactstrap";
import BoardCarouselItem from "./BoardCarouselItem";

const BoardCarouselPage = ({ items, loading = true }) => (
  <Row className='justify-content-center'>
    {items.map((item, index) => (
      <Col xs='auto' key={index} className='d-flex justify-content-center'>
        <BoardCarouselItem item={item} loading={loading} />
      </Col>
    ))}
  </Row>
);

export default BoardCarouselPage;
