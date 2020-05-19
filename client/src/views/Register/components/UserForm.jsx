import React, { Component } from "react";
import { Form, Input } from "antd";
// import LayoutConfig from "./LayoutConfig";

class UserForm extends Component {
  state = {
    currentStep: this.props.currentStep,
    contractorType: "",
    email: "",
    name: "",
    lastname: "",
    passowrd: "",
    confirm: "",
    userForm: {
      email: "",
      name: "",
      lastname: "",
      passowrd: "",
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
      passowrd: state.password,
      confirm: state.confirm,
    };
    this.props.getUserForm(userForm);
  };

  render() {
    if (
      this.props.currentStep !== 1 &&
      this.props.contractorType === "contract"
    ) {
      return null;
    }

    if (
      this.props.currentStep !== 1 &&
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
        <p>{this.props.currentStep} / 3</p>

        <Form.Item
          name="email"
          label="Email"
          getValueFromEvent={(e) => {
            this.setState({
              email: e.target.value,
            });
          }}
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input name="email" onChange={this.onChange} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Imię"
          getValueFromEvent={(e) => {
            this.setState({
              name: e.target.value,
            });
          }}
        >
          <Input name="name" onChange={this.onChange} />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Nazwisko"
          getValueFromEvent={(e) => {
            this.setState({
              lastname: e.target.value,
            });
          }}
        >
          <Input name="lastname" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          getValueFromEvent={(e) => {
            this.setState({
              password: e.target.value,
            });
          }}
          rules={[
            {
              required: false,
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
          getValueFromEvent={(e) => {
            this.setState({
              confirm: e.target.value,
            });
          }}
          rules={[
            {
              required: false,
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
