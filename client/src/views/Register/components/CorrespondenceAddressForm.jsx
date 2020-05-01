import React, { Component } from "react";
import { Form, Input } from "antd";
import LayoutConfig from "./LayoutConfig";

class CorespondenceAddressForm extends Component {
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
          name={["ulica", "ulica"]}
          label="ulica"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["nrDomu", "nrDomu"]}
          label="numer budynku"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={["nrLokalu", "nrLokalu"]} label="numer lokalu">
          <Input />
        </Form.Item>

        <Form.Item
          name={["miasto", "miasto"]}
          label="miasto"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["kodPocz", "kodPocz"]}
          label="kod pocztowy"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["kraj", "kraj"]}
          label="kraj"
          rules={[
            {
              required: true,
              defaultField: "Polska",
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

export default CorespondenceAddressForm;
