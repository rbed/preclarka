import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../views/HomePage";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Home from "../views/Home/Home";
import CreateOrder from "../views/CreateOrder/CreateOrder";
import OrdersInProgress from "../views/OrdersInProgress/OrdersInProgress";
import OrdersCompleted from "../views/OrdersCopleted/OrdersCompleted";
import OrdersForAcceptance from "../views/OrdersForAcceptance/OrdersForAcceptance";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/create-order" component={CreateOrder} />
          <PrivateRoute
            exact
            path="/orders-in-progress"
            component={OrdersInProgress}
          />
          <PrivateRoute
            exact
            path="/orders-completed"
            component={OrdersCompleted}
          />
          <PrivateRoute
            exact
            path="/orders-for-acceptance"
            component={OrdersForAcceptance}
          />
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          {/* <PrivateRoute exact path="" component={} /> */}
          <Route exact path="/homepage" component={HomePage} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
