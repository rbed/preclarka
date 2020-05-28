import React, { Component } from "react";
import { Steps } from "antd";

const { Step } = Steps;

class FormSteps extends Component {
  state = {
    currentStep: 0,
  };

  onChange = (current) => {
    console.log("onChange:", current);
    this.setState({ currentStep: current });
    this.props.getCurrentStep(current);
  };

  render() {
    return (
      <Steps
        type="navigation"
        current={this.state.currentStep}
        onChange={this.onChange}
        className="site-navigation-steps"
      >
        <Step status="user" title="Dane usera" />
        <Step status="tax" title="Dane podatnika" />
        <Step status="address" title="Dane adresowe" />
      </Steps>
    );
  }
}

export default FormSteps;
