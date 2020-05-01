import React, { Component } from "react";
import Routes from "./routes/Routes";
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
