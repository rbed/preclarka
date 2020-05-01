import React, { Component } from "react";
import { Form, Button } from "antd";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import ContractDataForm from "./ContractDataform";
import AgreementForm from "./AgreementForm";
import LayoutConfig from "./LayoutConfig";

class RegisterContract extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    console.log(values);
  };

  render() {
    return (
      <Form
        {...LayoutConfig.layout}
        name="nest-messages"
        onFinish={this.onFinish}
        validateMessages={LayoutConfig.validateMessages}
      >
        <UserForm />

        <ContractDataForm />

        <AddressForm />

        <AgreementForm />

        <Form.Item
          wrapperCol={{ ...LayoutConfig.layout.wrapperCol, offset: 8 }}
        >
          <Button type="primary" htmlType="submit">
            Rejestruj
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default RegisterContract;
