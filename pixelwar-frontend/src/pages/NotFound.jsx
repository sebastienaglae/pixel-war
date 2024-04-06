import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

function NotFound() {
  return (
    <Container className='my-5'>
      <Row>
        <Col>
          <h1>404 - Page introuvable</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>La page que vous recherchez n&apos;existe pas.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Retournez à la <Link to='/'>page d&apos;accueil</Link>.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
