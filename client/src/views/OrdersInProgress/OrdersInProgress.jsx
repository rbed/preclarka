import React, { Component } from "react";

class OrdersInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h2>Zamówienia w realizacji</h2>
        <p>Pozycjoner zobaczy tu zamówienia które są dla niego pisane</p>;
        <p>Copywriter zamówienia ktore sam przyjął do realizacji i je pisze</p>
        <p>
          Admin zobaczy wszystkie zamówienia jakie są pisane przez copywriterów
        </p>
      </>
    );
  }
}

export default OrdersInProgress;
