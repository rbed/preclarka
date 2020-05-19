import React, { Component } from "react";
import { Form, Button } from "antd";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import ContractDataForm from "./ContractDataform";
import AgreementForm from "./AgreementForm";
import LayoutConfig from "./LayoutConfig";
import Client from "../../../modules/Client/Client";

class RegisterContract extends Component {
  state = {
    currentStep: 1,
    contractorType: "",
    UserForm: {},
    ContractDataForm: {},
    CompanyDateForm: {},
    AddressForm: {},
    CorespondenceAddressForm: {},
    userData: {},
    addressData: {},
    companyData: {},
    contractData: {},
  };
  // this.handleClickFormNext = this.handleClickFormNext.bind(this);

  setUserForm = (userForm) => {
    console.log(userForm);
    this.setState({ UserForm: userForm });
    console.log(this.state.UserForm);
  };

  setContractDataForm = (contractDataForm) => {
    console.log(contractDataForm);
    this.setState({ ContractDataForm: contractDataForm });
  };

  setAddressForm = (addressForm) => {
    // console.log(addressForm);
    this.setState({ AddressForm: addressForm });
  };

  setCorespondenceAddressForm = (copespondenceAddressForm) => {
    this.setState({ CorespondenceAddressForm: copespondenceAddressForm });
    // console.log(this.state);
  };

  componentDidMount() {
    this.setState({ contractorType: this.props.getType });
  }

  onFinish = (values) => {
    console.log(values);
  };

  handleClickFormNext() {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  async handleSubmit(e) {
    // tworzy usera
    e.preventDefault();
    try {
      const doc = await Client.Services.UsersService.create(
        this.state.UserForm
      );
      console.log("data usera w handlesubmit" + JSON.stringify(doc.data));
      const data = doc.data;
      this.setState({ userData: data });
    } catch {
      console.log("error usera w registerContract");
    }
    // tworzy adres
    try {
      const doc = await Client.Services.AddressesService.create(
        this.state.AddressForm
      );
      const data = doc.data;
      this.setState({ addressData: data });
    } catch {
      console.log("error adresu w registerContract");
    }
    // tworzy copywritera z umową
    try {
      const doc = await Client.Services.CopywriterContractService.create(
        this.state.addressData,
        this.state.userData,
        this.state.ContractDataForm
      );
      const data = JSON.stringify(doc.data);
      this.setState({ copywriterContractData: data });
      if (this.state.copywriterContractData) {
        this.setState({ userForm: {} });
        this.setState({ addressForm: {} });
        this.setState({ contractDataForm: {} });
      }
    } catch {
      console.log("error copywritera umowy w registerContract");
    }
  }

  render() {
    // console.log(this.state.currentStep);

    return (
      <Form
        {...LayoutConfig.layout}
        name="nest-messages"
        onFinish={this.onFinish}
        validateMessages={LayoutConfig.validateMessages}
      >
        <UserForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
          getUserForm={this.setUserForm}
        />

        <ContractDataForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
          getContractDataForm={this.setContractDataForm}
        />

        <AddressForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
          getAddressForm={this.setAddressForm}
          getCorespondenceAddressForm={this.setCorespondenceAddressForm}
        />

        <AgreementForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
        />

        <Form.Item
          wrapperCol={{ ...LayoutConfig.layout.wrapperCol, offset: 8 }}
        >
          {this.state.currentStep === 3 ? (
            <Button
              onClick={(e) => this.handleSubmit(e)}
              type="primary"
              htmlType="submit"
            >
              Rejestruj
            </Button>
          ) : (
            <Button onClick={() => this.handleClickFormNext()} type="primary">
              Dalej
            </Button>
          )}
        </Form.Item>

        <div>{JSON.stringify(this.state.userForm)}</div>
      </Form>
    );
  }
}

export default RegisterContract;
