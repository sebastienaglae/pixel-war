import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useRequest } from "@hooks/api";
import { RoleContext } from "@contexts/RoleContext";

function SignupPage() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const { data, execute, error } = useRequest("/auth", {}, "post");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
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
    execute("/register", {
      data: {
        nickname: formData.nickname,
        email: formData.email,
        password: formData.password,
        bio: formData.bio,
      },
    });
  };

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
                    name='nickname'
                    id='nickname'
                    minLength='4'
                    maxLength='16'
                    value={formData.nickname}
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
                <FormGroup>
                  <Label for='bio'>Bio</Label>
                  <Input
                    type='text'
                    placeholder='Entrez votre bio'
                    name='bio'
                    id='bio'
                    value={formData.bio}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <p>
                  <Link to='/login'>Déjà inscrit ? Connectez-vous</Link>
                </p>
                <div className='my-2'>
                  {!passwordsMatch && <strong>Passwords do not match</strong>}
                </div>
                {error && <p className='text-danger'>{error}</p>}
                <Button
                  color='success'
                  type='submit'
                  disabled={!passwordsMatch}
                >
                  S&apos;inscrire
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
