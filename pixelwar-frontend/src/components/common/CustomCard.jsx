// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function CustomCard(props) => {
  const { title, content } = props;

  return (
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{content}</CardText>
      </CardBody>
    </Card>
  );
}

// Define propTypes for CustomCard component
CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default CustomCard;

