import React, { Component } from "react";
import { Breadcrumb } from "antd";

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default Breadcrumbs;
