import React, { Component } from "react";
import { Form, Button } from "antd";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import CompanyDataForm from "./CompanyDataForm";
import AgreementForm from "./AgreementForm";
import LayoutConfig from "./LayoutConfig";
import Client from "../../../modules/Client/Client";

class RegisterInvoice extends Component {
  state = {
    currentStep: 1,
    contractorType: "",
    UserForm: {},
    CompanyDataForm: {},
    AddressForm: {},
    CorespondenceAddressForm: {},
    userData: {},
    addressData: {},
    companyData: {},
    copywriterInvoiceData: {},
  };
  // this.handleClickFormNext = this.handleClickFormNext.bind(this);

  setUserForm = (userForm) => {
    this.setState({ UserForm: userForm });
  };

  setCompanyDataForm = (companyDataForm) => {
    console.log(companyDataForm);
    this.setState({ CompanyDataForm: companyDataForm });
  };

  setAddressForm = (addressForm) => {
    // console.log(addressForm);
    this.setState({ AddressForm: addressForm });
  };

  setCorespondenceAddressForm = (copespondenceAddressForm) => {
    // console.log(copespondenceAddressForm);
    this.setState({ CorespondenceAddressForm: copespondenceAddressForm });
  };

  componentDidMount() {
    this.setState({ contractorType: this.props.getType });
  }

  onFinish = (values) => {
    console.log(values);
  };

  handleClickFormNext() {
    console.log("klik");
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
      const doc = await Client.Services.CopywriterInvoiceService.create(
        this.state.addressData,
        this.state.userData,
        this.state.CompanyDataForm
      );
      const data = JSON.stringify(doc.data);
      this.setState({ copywriterInvoiceData: data });
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

        <CompanyDataForm
          currentStep={this.state.currentStep}
          contractorType={this.state.contractorType}
          getCompanyDataForm={this.setCompanyDataForm}
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
      </Form>
    );
  }
}

export default RegisterInvoice;
