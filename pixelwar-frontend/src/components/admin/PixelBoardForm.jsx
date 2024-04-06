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

function PixelBoardForm({ initialData = {}, onSubmit, error = "", isEdit = false }) {
  const [pixelBoard, setPixelBoard] = useState({
    name: "",
    resolution: {
      x: 0,
      y: 0,
    },
    colors: [],
    delay: 0,
    startAt: new Date(),
    endAt: new Date(),
    mode: "allow-overwrite",
    ...initialData,
  });

  useEffect(() => {
    setPixelBoard((currentState) => ({ ...currentState, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPixelBoard((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleResolutionChange = (e) => {
    const { name, value } = e.target;
    setPixelBoard((prevState) => ({
      ...prevState,
      resolution: { ...prevState.resolution, [name]: value },
    }));
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

  const onDeleteColor = (index) => {
    const colors = [...pixelBoard.colors];
    colors.splice(index, 1);
    setPixelBoard((prevState) => ({ ...prevState, colors }));
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Container>
      <Row>
        <Col >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='name'>Nom</Label>
              <Input
                type='text'
                name='name'
                id='name'
                minLength={4}
                maxLength={16}
                value={pixelBoard.name}
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
                  name='x'
                  id='resolutionX'
                  min={1}
                  max={1000}
                  value={pixelBoard.resolution.x}
                  onChange={handleResolutionChange}
                  required
                />
                <span className='mx-2 my-auto'>X</span>
                <Input
                  type='number'
                  name='y'
                  id='resolutionY'
                  min={1}
                  max={1000}
                  value={pixelBoard.resolution.y}
                  onChange={handleResolutionChange}
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
                disabled={isEdit}
              >
                <option value=''>Sélectionnez un mode</option>
                <option value='allow-overwrite'>
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
                  <ColorItem
                    key={index}
                    id={index + 1}
                    onColorChange={(id, color) => onColorChange(id - 1, color)}
                    value={color}
                    disabled={isEdit}
                    onDelete={(id) => onDeleteColor(id - 1)}
                  />
                ))}
                <Button
                  color='primary'
                  onClick={() => addColor(getRandomColor())}
                  className='mt-2'
                  disabled={pixelBoard.colors.length >= 15 || isEdit}
                >
                  Ajouter une couleur
                </Button>
                <small>Entre 1 et 15 couleurs</small>
              </Card>
            </FormGroup>
            <FormGroup>
              <Label>Delai</Label>
              <Input
                type='number'
                name='delay'
                id='delay'
                min={1}
                max={1000}
                value={pixelBoard.delay}
                onChange={handleChange}
                required
              />
              <small>Doit être compris entre 1 et 3600 secondes</small>
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
