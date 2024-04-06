import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <Container className='my-5'>
      <Row>
        <Col>
          <h1>401 - Non autorisé</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Votre rôle ne vous permet pas d&apos;accéder à cette page.</p>
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

export default Unauthorized;
