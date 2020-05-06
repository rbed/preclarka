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
          name={["ulicaKoresp", "ulicaKoresp"]}
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
          name={["nrDomuKoresp", "nrDomuKoresp"]}
          label="numer budynku"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["nrLokaluKoresp", "nrLokaluKoresp"]}
          label="numer lokalu"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["miastoKoresp", "miastoKoresp"]}
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
          name={["kodPoczKoresp", "kodPoczKoresp"]}
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
          name={["krajKoresp", "krajKoresp"]}
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
