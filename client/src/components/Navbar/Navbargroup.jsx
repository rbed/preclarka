import React, { Component } from "react";
import { Button } from "antd";

class Navbargroup extends Component {
  state = {
    buttons: [
      { text: "info1", href: "abc" },
      { text: "info2", href: "abcd" },
    ],
  };

  getButtons() {
    const { buttons } = this.state;
    return buttons.map((b) => {
      return <Button href={b.href}>{b.text}</Button>;
    });
  }

  alignMe() {
    const { align } = this.props;
    if (!align) {
      return {};
    }
    if (align === "left") {
      return { float: "left" };
    }
    if (align === "right") {
      return { float: "right" };
    }
  }
  render() {
    return <div style={this.alignMe()}>{this.getButtons()}</div>;
    // return <div style={{ float: "left", left: 0 }}>{this.props.children}</div>;
  }
}

export default Navbargroup;
