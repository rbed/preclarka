import React, { Component } from "react";
import { Form, Input } from "antd";

class CompanyDataForm extends Component {
  state = {
    currentStep: this.props.currentStep,
    nazwaFirmy: "",
    regon: "",
    nip: "",
    CompanyDataForm: {
      nazwaFirmy: "",
      regon: "",
      nip: "",
    },
  };

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    const CompanyDataForm = {
      nazwaFirmy: state.nazwaFirmy,
      regon: state.regon,
      nip: state.nip,
    };
    this.props.getCompanyDataForm(CompanyDataForm);
  };

  onFinish = (values) => {
    console.log(values);
  };

  render() {
    if (
      this.props.currentStep !== 1 &&
      this.props.contractorType === "invoice"
    ) {
      return null;
    }

    return (
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
          <Input name="nazwaFirmy" onChange={this.onChange} />
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
          <Input name="regon" onChange={this.onChange} />
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
          <Input name="nip" onChange={this.onChange} />
        </Form.Item>
      </>
    );
  }
}

export default CompanyDataForm;
