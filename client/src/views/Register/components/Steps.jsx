import React, { Component } from "react";
import { Steps } from "antd";
import StepsControll from "./StepsControll";

const { Step } = Steps;

class FormSteps extends Component {
  state = {
    currentStep: 0,
  };

  onChange = (current) => {
    this.setState({ currentStep: current });
    this.props.getCurrentStep(current);
  };

  showSteps(progress) {
    const {
      userForm,
      companyDataForm,
      contractorDataForm,
      addressForm,
      contractorType,
    } = this.props;
    const userFormFulfil = StepsControll.checkIFUserFormIsFulfil(userForm);
    const companyFormFulfil = StepsControll.checkIfCompanyFormIsFulfil(
      companyDataForm,
      contractorType
    );
    const contractorFormFulfil = StepsControll.checkIfContractorFormIsFulfil(
      contractorDataForm,
      contractorType
    );

    if (this.state.currentStep === 0 && progress === 2 && userFormFulfil)
      return true;
    if (this.state.currentStep === 0 && progress === 2 && !userFormFulfil)
      return false;

    if (
      this.state.currentStep === 1 &&
      progress === 3 &&
      contractorType === "invoice" &&
      companyFormFulfil
    )
      return true;

    if (
      this.state.currentStep === 1 &&
      progress === 3 &&
      contractorType === "invoice" &&
      !companyFormFulfil
    )
      return false;

    if (
      this.state.currentStep === 1 &&
      progress === 3 &&
      contractorType === "contract" &&
      contractorFormFulfil
    ) {
      return true;
    }

    if (
      this.state.currentStep === 1 &&
      progress === 3 &&
      contractorType === "contract" &&
      !contractorFormFulfil
    ) {
      return false;
    }

    if (
      this.state.currentStep === 0 &&
      progress === 3 &&
      contractorType === "invoice" &&
      companyFormFulfil
    )
      return true;

    if (
      this.state.currentStep === 0 &&
      progress === 3 &&
      contractorType === "invoice" &&
      !companyFormFulfil
    )
      return false;

    if (
      this.state.currentStep === 0 &&
      progress === 3 &&
      contractorType === "contract" &&
      contractorFormFulfil
    ) {
      return true;
    }

    if (
      this.state.currentStep === 0 &&
      progress === 3 &&
      contractorType === "contract" &&
      !contractorFormFulfil
    ) {
      return false;
    }

    if (this.state.currentStep === 0 && progress === 3) return true;
  }

  render() {
    return (
      <>
        <p>{this.state.currentStep}</p>
        <Steps
          type="navigation"
          current={this.state.currentStep}
          onChange={this.onChange}
          className="site-navigation-steps"
        >
          <Step status="user" title="Dane usera" />

          <Step
            status="tax"
            title="Dane podatnika"
            disabled={this.showSteps(2) ? true : false}
          />

          <Step
            status="address"
            title="Dane adresowe"
            disabled={this.showSteps(3) ? true : false}
          />
        </Steps>
      </>
    );
  }
}

export default FormSteps;
