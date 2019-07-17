import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


const DishdetailComponent = (props) => {

  const { dish } = props;

  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  )
}

export default DishdetailComponent;
