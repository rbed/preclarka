import React, { Component } from "react";
import { Form, Input, Checkbox } from "antd";
import CorespondenceAddressForm from "./CorrespondenceAddressForm";
import LayoutConfig from "./LayoutConfig";

class AddressForm extends Component {
  state = {
    ulica: "",
    nrBudynku: "",
    nrLokalu: "",
    miasto: "",
    kodPocz: "",
    kraj: "",
    CorespondenceAddressForm: {},
    AddressForm: {
      ulica: "",
      nrBudynku: "",
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
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    //const state = this.state;
    const addressForm = {
      ulica: state.ulica,
      nrBudynku: state.nrBudynku,
      nrLokalu: state.nrLokalu,
      miasto: state.miasto,
      kodPocz: state.kodPocz,
      kraj: state.kraj,
    };
    this.props.getAddressForm(addressForm);
  };

  render() {
    if (
      this.props.currentStep !== 3 &&
      this.props.contractorType === "contract"
    ) {
      return null;
    }

    if (
      this.props.currentStep !== 3 &&
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
          name={["nrDomu", "nrDomu"]}
          label="numer budynku"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="nrBudynku" onChange={this.onChange} />
        </Form.Item>

        <Form.Item name={["nrLokalu", "nrLokalu"]} label="numer lokalu">
          <Input name="nrLokalu" onChange={this.onChange} />
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
          <Input name="miasto" onChange={this.onChange} />
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
          <Input name="kodPocz" onChange={this.onChange} />
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
          <Input name="kraj" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
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
        )}
      </>
      // </Form>
    );
  }
}

export default AddressForm;
