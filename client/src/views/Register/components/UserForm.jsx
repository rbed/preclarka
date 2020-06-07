import React, { Component } from "react";
import { Form, Input } from "antd";
// import LayoutConfig from "./LayoutConfig";

class UserForm extends Component {
  state = {
    // currentStep: this.props.currentStep,
    // contractorType: "",
    email: "",
    name: "",
    lastname: "",
    password: "",
    confirm: "",
    userForm: {
      email: "",
      name: "",
      lastname: "",
      password: "",
      confirm: "",
    },
  };

  onFinish = (values) => {
    console.log(values);
  };

  onChange = (e) => {
    //sconsole.log(e.target.value);
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    //const state = this.state;
    const userForm = {
      email: state.email,
      name: state.name,
      lastname: state.lastname,
      password: state.password,
      confirm: state.confirm,
    };
    this.props.getUserForm(userForm);
  };

  render() {
    if (
      this.props.currentStep !== 0 &&
      this.props.contractorType === "contract"
    ) {
      return null;
    }

    if (
      this.props.currentStep !== 0 &&
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
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input name="email" onChange={this.onChange} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Imię"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="name" onChange={this.onChange} />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Nazwisko"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="lastname" onChange={this.onChange} />
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
          <Input.Password name="password" onChange={this.onChange} />
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
          <Input.Password name="confirm" onChange={this.onChange} />
        </Form.Item>

        {/* </Form> */}
      </>
    );
  }
}

export default UserForm;
