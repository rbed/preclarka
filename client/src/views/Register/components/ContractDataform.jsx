import React, { Component } from "react";
import { Form, Input } from "antd";
import LayoutConfig from "./LayoutConfig";

class ContractDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    console.log(values);
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
          name={["imieMatki", "imieMatki"]}
          label="imię matki"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["imieOjca", "imieOjca"]}
          label="imię ojca"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["nrDowodu", "nrDowodu"]}
          label="seria i numer dowodu osobistego"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["pesel", "pesel"]}
          label="pesel"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["nip", "nip"]}
          label="nip"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
      // </Form>
    );
  }
}

export default ContractDataForm;
