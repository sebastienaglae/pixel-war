import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { password, confirmPassword } = formData;
    setPasswordsMatch(password === confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordsMatch) {
      console.log("Form submitted successfully.");
    }
  };

  return (
    <Container className='my-5'>
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }}>
          <Card className='bg-dark'>
            <CardBody>
              <CardTitle>
                <h2 className='text-center'>S&apos;inscrire</h2>
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for='username'>Nom d&apos;utilisateur</Label>
                  <Input
                    type='text'
                    placeholder="Entrez votre nom d'utilisateur"
                    name='username'
                    id='username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input
                    type='email'
                    placeholder='Entrez votre email'
                    name='email'
                    id='email'
                    value={formData.email}
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
                <FormGroup>
                  <Label for='confirmPassword'>Confirmer le mot de passe</Label>
                  <Input
                    type='password'
                    placeholder='Confirmez votre mot de passe'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <p>
                  <Link to='/login'>Déjà inscrit ? Connectez-vous</Link>
                </p>
                <div>
                  {!passwordsMatch && (
                    <span className='error-message'>
                      Passwords do not match
                    </span>
                  )}
                </div>
                <Button
                  color='success'
                  type='submit'
                  disabled={!passwordsMatch}
                >
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

export default SignupPage;
