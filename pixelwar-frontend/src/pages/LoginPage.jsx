import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useState } from "react";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted successfully.");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className='mt-5'>
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }}>
          <Card className='bg-dark'>
            <CardBody>
              <CardTitle>
                <h2 className='text-center'>Se connecter</h2>
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for='username'>Nom d&apos;utilisateur</Label>
                  <Input
                    type='text'
                    placeholder='Entrez votre nom d&apos;utilisateur'
                    name='username'
                    id='username'
                    value={loginData.username}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='password'>Mot de passe</Label>
                  <Input
                    type='password'
                    placeholder='Entrez votre mot de passe'
                    name='password'
                    id='password'
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <p>
                  <Link to='/signup'>Créer un compte</Link>
                </p>
                <Button color='success' type='submit'>
                  Se connecter
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
