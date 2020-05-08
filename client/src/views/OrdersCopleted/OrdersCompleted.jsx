import React, { Component } from "react";

class OrdersInCompleted extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h2>Zamówienia zakończone</h2>
        <p>
          Pozycjoner zobaczy tu zamówienia które już do niego dotarły i je
          zatwierdził
        </p>
        <p>
          Copywriter zamówienia ktore napisał wysłał i zostały zaakceptowane
        </p>
        <p>
          Admin zobaczy wszystkie zamówienia jakie zostały napisane i
          zaakceptowane
        </p>
      </>
    );
  }
}

export default OrdersInCompleted;
