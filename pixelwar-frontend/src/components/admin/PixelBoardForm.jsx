import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";

function PixelBoardForm({ initialData = {}, onSubmit }) {
  const [pixelBoard, setPixelBoard] = useState({
    title: "",
    size: "",
    delay: "",
    creationDate: new Date(),
    endDate: new Date(),
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

  return (
    <Container>
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='title'>Titre</Label>
              <Input
                type='text'
                name='title'
                id='title'
                value={pixelBoard.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='size'>Taille</Label>
              <Input
                type='number'
                name='size'
                id='size'
                value={pixelBoard.size}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for='delay'>Délai entre contributions (en secondes)</Label>
              <Input
                type='number'
                name='delay'
                id='delay'
                value={pixelBoard.delay}
                onChange={handleChange}
                required
              />
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
              <Label>Date de création</Label>
              <br />
              <DateTimePicker
                onChange={(date) => handleDateChange("creationDate", date)}
                value={pixelBoard.creationDate}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Date de fin</Label>
              <br />
              <DateTimePicker
                onChange={(date) => handleDateChange("endDate", date)}
                value={pixelBoard.endDate}
                required
              />
            </FormGroup>
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
