import React, { Component } from "react";
import { Form, Button } from "antd";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import CompanyDataForm from "./CompanyDataForm";
import AgreementForm from "./AgreementForm";
import LayoutConfig from "./LayoutConfig";

class RegisterInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      contractorType: "",
    };
    this.handleClickFormNext = this.handleClickFormNext.bind(this);
  }

  componentDidMount() {
    this.setState({ contractorType: "invoice" });
  }

  onFinish = (values) => {
    console.log(values);
  };

  handleClickFormNext() {
    this.setState({ currentStep: this.state.currentStep + 1 });
    console.log("chuj");
  }

  render() {
    return (
      <Form
        {...LayoutConfig.layout}
        name="nest-messages"
        onFinish={this.onFinish}
        validateMessages={LayoutConfig.validateMessages}
      >
        <UserForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
        />

        <CompanyDataForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
        />

        <AddressForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
        />

        <AgreementForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
        />

        <Form.Item
          wrapperCol={{ ...LayoutConfig.layout.wrapperCol, offset: 8 }}
        >
          {this.state.currentStep === 3 ? (
            <Button type="primary" htmlType="submit">
              Rejestruj
            </Button>
          ) : (
            <Button onClick={this.handleClickFormNext} type="primary">
              Dalej
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default RegisterInvoice;
