import React, { Component } from "react";
import { Form, Input, Checkbox } from "antd";
import CorespondenceAddressForm from "./CorrespondenceAddressForm";
import LayoutConfig from "./LayoutConfig";

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    console.log(values);
  };

  handleChange = (e) => {
    this.setState({ showAddress: !this.state.showAddress });
    console.log(this.state.showAddress);
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
          gf
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

        <Form.Item
          onChange={this.handleChange}
          name="different conrespondece address"
          valuePropName="checked"
          {...LayoutConfig.tailFormItemLayout}
        >
          <Checkbox>inny adres korespondencyjny</Checkbox>
        </Form.Item>

        {this.state.showAddress ? <CorespondenceAddressForm /> : ""}
      </>
      // </Form>
    );
  }
}

export default AddressForm;
