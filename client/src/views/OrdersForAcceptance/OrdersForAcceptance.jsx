import React, { Component } from "react";

class OrdersForAcceptance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <h2>Zamówienia do akceptacji</h2>
        <p>
          Pozycjoner zobaczy tu zamówienia zostały napisane, które powinien
          zatwierdzić lub odrzucić
        </p>
        <p>
          Copywriter (wstepnie) zobaczy nowa zlecenia które będzie mógł przyjąć
          lub odrzucić
        </p>
        <p>
          Admin zobaczy wszystkie zamówienia pozycjonerów jakie czekają na
          akceptację z ich strony (czy Admin poiwnien mieć osobną możliwość
          odrzucania treści?)
        </p>
      </>
    );
  }
}

export default OrdersForAcceptance;
