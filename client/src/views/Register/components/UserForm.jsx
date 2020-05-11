import React, { Component } from "react";
import { Form, Input } from "antd";
// import LayoutConfig from "./LayoutConfig";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: this.props.currentStep,
      contractorType: "",
    };
  }

  onFinish = (values) => {
    console.log(values);
  };

  onChange = (e) => {
    console.log(e);
    // return e.target.value;
  };

  render() {
    if (
      this.props.currentStep != 1 &&
      this.props.contractorType === "contract"
    ) {
      return null;
    }

    if (
      this.props.currentStep != 1 &&
      this.props.contractorType === "invoice"
    ) {
      return null;
    }

    return (
      // <Form
      //   {...LayoutConfig.layout}
      //   name="nest-messages"
      //   onFinish={this.onFinish}
      //   validateMessages={LayoutConfig.validateMessages}
      // >
      <>
        <p>{this.props.currentStep}</p>

        <Form.Item
          name={["user", "email"]}
          label="Email"
          getValueFromEvent={this.onChange()}
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <p>{this.state.contractorType}</p>
        <p>{console.log(this.state.contractorType)}</p>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </>
      // </Form>
    );
  }
}

export default UserForm;
