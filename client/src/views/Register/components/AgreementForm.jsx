import React, { Component } from "react";
import { Form, Checkbox } from "antd";
import LayoutConfig from "./LayoutConfig";

class AgreementForm extends Component {
  state = {
    currentStep: this.props.currentStep,
  };

  handleChange = (e) => {
    this.props.getAgreementForm(e.target.checked);
  };

  render() {
    if (
      this.props.currentStep !== 2 &&
      this.props.contractorType === "contract"
    ) {
      return null;
    }

    if (
      this.props.currentStep !== 2 &&
      this.props.contractorType === "invoice"
    ) {
      return null;
    }

    return (
      // <Form
      //   {...LayoutConfig.layout}
      //   name="nest-messages"
      //   validateMessages={LayoutConfig.validateMessages}
      // >
      <>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
              required: true,
            },
          ]}
          {...LayoutConfig.tailFormItemLayout}
        >
          <Checkbox onChange={this.handleChange}>
            Zapoznałem się z <a href="#">regulaminem</a>
          </Checkbox>
        </Form.Item>
      </>
      // </Form>
    );
  }
}

export default AgreementForm;
