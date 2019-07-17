import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishdetailComponent from './DishdetailComponent';
class Menu extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          selectedDish: null
      }
  }

  onDishSelect(dish) {
      this.setState({ selectedDish: dish});
  }

  render() {
    const { selectedDish } = this.state;

    const menu = this.props.dishes.map((dish) => {
        return (
          <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card key={dish.id}
              onClick={() => this.onDishSelect(dish)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                  <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        );
    });

    let commentaries = [];

    if(selectedDish) {
      commentaries = selectedDish.comments.map(commentary => (
        <div key={commentary.id}>
          <p>{commentary.comment}</p>
          <p>---{commentary.author}, {commentary.date}</p>
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="row">
            {menu}
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {selectedDish && (
              <DishdetailComponent dish={selectedDish} />
            )}
          </div>
          <div className="col-12 col-md-5 m-1">
            <h3>Comments</h3>
             {commentaries}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
