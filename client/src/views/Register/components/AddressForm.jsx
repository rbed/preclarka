import React, { Component } from "react";
import { Form, Input, Checkbox, Select, InputNumber } from "antd";
import CorespondenceAddressForm from "./CorrespondenceAddressForm";
import LayoutConfig from "./LayoutConfig";

const { Option } = Select;

class AddressDataForm extends Component {
  state = {
    ulica: "",
    nrDomu: "",
    nrLokalu: "",
    miasto: "",
    kodPocz: "",
    kraj: "Polska",
    CorespondenceAddressForm: {},
    AddressForm: {
      ulica: "",
      nrDomu: "",
      nrLokalu: "",
      miasto: "",
      kodPocz: "",
      kraj: "",
    },
  };

  onFinish = (values) => {
    console.log(values);
  };

  handleChange = (e) => {
    this.setState({ showAddress: !this.state.showAddress });
    console.log(this.state.showAddress);
  };

  setCorespondenceAddressForm = (copespondenceAddressForm) => {
    this.setState({ CorespondenceAddressForm: copespondenceAddressForm });
    this.props.getCorespondenceAddressForm(copespondenceAddressForm);
  };

  // setCorespondenceAddressForm = (copespondenceAddressForm) => {
  //   console.log("dupa");
  //   console.log(copespondenceAddressForm);
  //   this.setState({ CopespondenceAddressForm: copespondenceAddressForm });
  // };

  onChange = (e) => {
    //sconsole.log(e.target.value);
    console.log(this.props);
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    //const state = this.state;
    const addressForm = {
      ulica: state.ulica,
      nrDomu: state.nrDomu,
      nrLokalu: state.nrLokalu,
      miasto: state.miasto,
      kodPocz: state.kodPocz,
      kraj: state.kraj,
    };
    this.props.getAddressForm(addressForm);
  };

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
      //   onFinish={this.onFinish}
      //   validateMessages={LayoutConfig.validateMessages}
      // >
      <>
        <Form.Item
          name="ulica"
          label="ulica"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="ulica" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="nrDomu"
          label="numer budynku"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="nrDomu" onChange={this.onChange} />
        </Form.Item>

        <Form.Item name="nrLokalu" label="numer lokalu">
          <Input name="nrLokalu" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="miasto"
          label="miasto"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="miasto" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="kodPocz"
          label="kod pocztowy"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="kodPocz" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="kraj"
          label="kraj"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="kraj" defaultValue="Polska" onChange={this.onChange} />
        </Form.Item>

        {/* <Form.Item
          name="kraj"
          label="kraj"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="Polska">
            <Option value="Polska">Polska</Option>
            <Option value="Inny">Inny</Option>
          </Select>
        </Form.Item> */}

        {/* Włącznik i wyłśacznik do adresu korespondencyjnego */}
        {/* <Form.Item
          onChange={this.handleChange}
          name="different conrespondece address"
          valuePropName="checked"
          {...LayoutConfig.tailFormItemLayout}
        >
          <Checkbox>inny adres korespondencyjny</Checkbox>
        </Form.Item>

        {this.state.showAddress ? (
          <CorespondenceAddressForm
            getCorespondenceAddressForm={this.setCorespondenceAddressForm}
          />
        ) : (
          ""
        )} */}
      </>
      // </Form>
    );
  }
}

export default AddressDataForm;
