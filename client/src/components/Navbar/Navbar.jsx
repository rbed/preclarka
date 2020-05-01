import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={`navbar ${className ? className : ""}`}>
        {this.props.appName}
        <div style={{ float: "right" }}>{this.props.buttons}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

Navbar.defaultProps = {
  appName: "preclarka",
};

export default Navbar;
