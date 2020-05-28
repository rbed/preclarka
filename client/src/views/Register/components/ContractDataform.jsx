import React, { Component } from "react";
import { Form, Input, DatePicker } from "antd";
// import moment from "moment";

class ContractDataForm extends Component {
  state = {
    currentStep: this.props.currentStep,
    dataUrodzenia: "",
    imieMatki: "",
    imieOjca: "",
    nrDowodu: "",
    pesel: "",
    nip: "",
    contractDataForm: {
      dataUrodzenia: "",
      imieMatki: "",
      imieOjca: "",
      nrDowodu: "",
      pesel: "",
      nip: "",
    },
  };

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    const contractDataForm = {
      dataUrodzenia: state.dataUrodzenia,
      imieMatki: state.imieMatki,
      imieOjca: state.imieOjca,
      nrDowodu: state.nrDowodu,
      pesel: state.pesel,
      nip: state.nip,
    };
    this.props.getContractDataForm(contractDataForm);
  };

  dateChange = (moment, dateString) => {
    const birthDate = new Date(dateString);
    this.setState({ dataUrodzenia: birthDate });
  };

  onFinish = (values) => {
    console.log(values);
  };

  render() {
    if (
      this.props.currentStep !== 1 &&
      this.props.contractorType === "contract"
    ) {
      return null;
    }
    return (
      <>
        <Form.Item
          name="dataUrodzenia"
          label="data urodzenia"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker name="dataUrodzenia" onChange={this.dateChange} />
          {/* <Input name="dataUrodzenia" onChange={this.onChange} /> */}
        </Form.Item>

        <Form.Item
          name="imieMatki"
          label="imię matki"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="imieMatki" onChange={this.onChange} />
        </Form.Item>
        <Form.Item
          name="imieOjca"
          label="imię ojca"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="imieOjca" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="nrDowodu"
          label="seria i numer dowodu osobistego"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="nrDowodu" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="pesel"
          label="pesel"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="pesel" onChange={this.onChange} />
        </Form.Item>

        <Form.Item
          name="nip"
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

export default ContractDataForm;
