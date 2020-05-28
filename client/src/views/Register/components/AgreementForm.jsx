import React, { Component } from "react";
import { Form, Checkbox } from "antd";
import LayoutConfig from "./LayoutConfig";

class AgreementForm extends Component {
  constructor(props) {
    super(props);
    this.state = { currentStep: this.props.currentStep };
  }

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
            },
          ]}
          {...LayoutConfig.tailFormItemLayout}
        >
          <Checkbox>
            Zapoznałem się z <a href="#">regulaminem</a>
          </Checkbox>
        </Form.Item>
      </>
      // </Form>
    );
  }
}

export default AgreementForm;
