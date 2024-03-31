/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import ColorItem from "./ColorItem";

function PixelBoardForm({ initialData = {}, onSubmit, error = "" }) {
  const [pixelBoard, setPixelBoard] = useState({
    title: "",
    resolution: {
      x: 0,
      y: 0,
    },
    colors: [],
    startAt: new Date(),
    endAt: new Date(),
    mode: "",
    ...initialData,
  });

  useEffect(() => {
    setPixelBoard((currentState) => ({ ...currentState, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPixelBoard((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setPixelBoard((prevState) => ({ ...prevState, [name]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pixelBoard);
  };

  const addColor = (hex) => {
    setPixelBoard((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, hex],
    }));
  };

  const onColorChange = (index, color) => {
    const colors = [...pixelBoard.colors];
    colors[index] = color;
    setPixelBoard((prevState) => ({ ...prevState, colors }));
  };


  return (
    <Container>
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='name'>Nom</Label>
              <Input
                type='text'
                name='name'
                id='name'
                value={pixelBoard.title}
                onChange={handleChange}
                required
              />
              <small>
                Doit être unique et doit faire entre 4 et 16 caractères
              </small>
            </FormGroup>
            <FormGroup>
              <Label for='size'>Taille</Label>
              <div className='d-flex'>
                <Input
                  type='number'
                  name='resolutionX'
                  id='resolutionX'
                  value={pixelBoard.resolution.x}
                  onChange={handleChange}
                  required
                />
                <span className='mx-2 my-auto'>X</span>
                <Input
                  type='number'
                  name='resolutionY'
                  id='resolutionY'
                  value={pixelBoard.resolution.y}
                  onChange={handleChange}
                  required
                />
              </div>
              <small>Doit être compris entre 1 et 1000 pixels</small>
            </FormGroup>
            <FormGroup>
              <Label for='mode'>Mode</Label>
              <Input
                type='select'
                name='mode'
                id='mode'
                value={pixelBoard.mode}
                onChange={handleChange}
                required
              >
                <option value=''>Sélectionnez un mode</option>
                <option value='overwrite'>
                  Autoriser le dessin sur pixels existants
                </option>
                <option value='no-overwrite'>
                  Interdire le dessin sur pixels existants
                </option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Couleurs</Label>
              <Card body color='dark' className='d-flex flex-column'>
                {pixelBoard.colors.map((color, index) => (
                  <ColorItem key={index} id={index} />
                ))}
                <Button
                  color='primary'
                  onClick={() => addColor()}
                  className='mt-2'
                >
                  Ajouter une couleur
                </Button>
                <small>Entre 1 et 15 couleurs</small>
              </Card>
            </FormGroup>
            <FormGroup>
              <Label>Date de création</Label>
              <br />
              <DateTimePicker
                onChange={(date) => handleDateChange("startAt", date)}
                value={pixelBoard.startAt}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Date de fin</Label>
              <br />
              <DateTimePicker
                onChange={(date) => handleDateChange("endAt", date)}
                value={pixelBoard.endAt}
                required
              />
            </FormGroup>
            {error && <p className='text-danger'>{error}</p>}
            <Button color='primary' type='submit'>
              Soumettre
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PixelBoardForm;
