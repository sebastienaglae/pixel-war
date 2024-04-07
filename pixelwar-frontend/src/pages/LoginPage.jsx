import { Link, useNavigate } from "react-router-dom";
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
import { useState, useEffect, useContext } from "react";
import { useRequest } from "@hooks/api";
import { RoleContext } from "@contexts/RoleContext";

function LoginPage() {
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });

  const { data, execute, error } = useRequest("/auth", {}, "post");
  const navigate = useNavigate();
  const { setToken } = useContext(RoleContext);
  useEffect(() => {
    if (data) {
      setToken(data.token);
      navigate("/");
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    execute("/login", {
      data: formData,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container className='my-5'>
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }}>
          <Card className='bg-dark'>
            <CardBody>
              <CardTitle>
                <h2 className='text-center'>Se connecter</h2>
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for='nickname'>Nom d&apos;utilisateur</Label>
                  <Input
                    type='text'
                    placeholder='Entrez votre nom d&apos;utilisateur'
                    name='nickname'
                    minLength='4'
                    maxLength='16'
                    id='nickname'
                    value={formData.nickname}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <p>
                  <Link to='/signup'>Créer un compte</Link>
                </p>
                {error && <p className='text-danger'>{error}</p>}
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
