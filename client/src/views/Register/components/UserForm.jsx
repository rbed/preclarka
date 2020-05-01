import React, { Component } from "react";
import { Form, Input } from "antd";
// import LayoutConfig from "./LayoutConfig";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    console.log(values);
  };

  onChange = (e) => {
    console.log(e);
    // return e.target.value;
  };

  render() {
    return (
      // <Form
      //   {...LayoutConfig.layout}
      //   name="nest-messages"
      //   onFinish={this.onFinish}
      //   validateMessages={LayoutConfig.validateMessages}
      // >
      <>
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
