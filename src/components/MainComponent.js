import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
    };
  }

  render() {
    return (
      <div>
        <Header />
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
          </Switch>
        <Footer /> 
      </div>
    );
  }
}

export default Main;
