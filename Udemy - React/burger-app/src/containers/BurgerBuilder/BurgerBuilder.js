import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => { this.setState({ error: true }) });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((acc, curr) => acc + curr, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const newCount = this.state.ingredients[type] + 1;

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newCount;

    this.setState({ ingredients: newIngredients, totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type] });

    this.updatePurchaseState(newIngredients);
  }

  removeIngredientHandler = type => {
    const newCount = this.state.ingredients[type] - 1;
    if (newCount < 0) {
      return;
    }

    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = newCount;

    this.setState({ ingredients: newIngredients, totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type] });

    this.updatePurchaseState(newIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    // alert('You continue!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Micuda Andrei',
        address: {
          street: 'Teststreet 1',
          zipCode: '41325',
          country: 'Romania'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] <= 0);
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>);

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
};

export default withErrorHandler(BurgerBuilder, axios);