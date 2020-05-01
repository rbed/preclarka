import React, { Component } from "react";
import { Form, Input } from "antd";
import LayoutConfig from "./LayoutConfig";

class CompanyDataForm extends Component {
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
          name={["nazwaFirmy", "nazwaFirmy"]}
          label="nazwa firmy"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["regon", "regon"]}
          label="regon"
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

export default CompanyDataForm;
