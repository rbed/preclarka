import React, { Component } from "react";
import { Form, Input } from "antd";

class CorespondenceAddressForm extends Component {
  state = {
    ulicaKoresp: "",
    nrBudynkuKoresp: "",
    nrLokaluKoresp: "",
    miastoKoresp: "",
    kodPoczKoresp: "",
    krajKoresp: "",
    // corespondenceAddressFrorm: {},
    CorespondenceAddressForm: {
      ulicaKoresp: "",
      nrBudynkuKoresp: "",
      nrLokaluKoresp: "",
      miastoKoresp: "",
      kodPoczKoresp: "",
      krajKoresp: "",
    },
  };

  onFinish = (values) => {
    console.log(values);
  };

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
    const CorespondenceAddressForm = {
      ulica: state.ulicaKoresp,
      nrBudynku: state.nrBudynkuKoresp,
      nrLokalu: state.nrLokaluKoresp,
      miasto: state.miastoKoresp,
      kodPocz: state.kodPoczKoresp,
      kraj: state.krajKoresp,
    };
    this.props.getCorespondenceAddressForm(CorespondenceAddressForm);
  };

  render() {
    return (
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
          <Input name="ulicaKoresp" onChange={this.onChange} />
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
          <Input name="nrDomuKoresp" onChange={this.onChange} />
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
          <Input name="miastoKoresp" onChange={this.onChange} />
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
          <Input name="kodPoczKoresp" onChange={this.onChange} />
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
          <Input name="krajKoresp" onChange={this.onChange} />
        </Form.Item>
      </>
    );
  }
}

export default CorespondenceAddressForm;
