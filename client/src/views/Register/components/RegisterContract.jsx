import React, { Component } from "react";
import { Form, Button } from "antd";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import ContractDataForm from "./ContractDataform";
import AgreementForm from "./AgreementForm";
import LayoutConfig from "./LayoutConfig";
import Client from "../../../modules/Client/Client";
import FormSteps from "./Steps";
import StepsControll from "./StepsControll";

class RegisterContract extends Component {
  constructor(props) {
    super(props);
    this.StepsElement = React.createRef();
    this.formRef = React.createRef();
    this.state = {
      currentStep: 0,
      contractorType: "",
      AgreementForm: false,
      UserForm: {},
      ContractDataForm: {},
      CompanyDataForm: {},
      AddressForm: {},
      CorespondenceAddressForm: {},
      userData: {},
      addressData: {},
      companyData: {},
      contractData: {},
    };
    // this.handleClickFormNext = this.handleClickFormNext.bind(this);
  }
  setUserForm = (userForm) => {
    // console.log(userForm);
    this.setState({ UserForm: userForm });
    console.log(this.state.UserForm);
  };

  setContractDataForm = (contractDataForm) => {
    // console.log(contractDataForm);
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

  setAgreementDataForm = (agreement) => {
    this.setState({ AgreementForm: agreement });
  };

  componentDidMount() {
    this.setState({ contractorType: this.props.getType });
  }

  onFinish = (values) => {
    console.log(values);
  };

  handleClickFormNext() {
    this.StepsElement.current.onChange(this.state.currentStep + 1);
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  setCurrentStep = (currentStep) => {
    this.setState({ currentStep: currentStep });
  };

  async handleSubmit(e) {
    // tworzy usera
    e.preventDefault();

    const { UserForm, AddressForm, ContractDataForm } = this.state;
    // TODO: gdzie jest TRY
    const form = {
      user: UserForm,
      address: AddressForm,
      copywriter: ContractDataForm,
    };
    try {
      let data = await Client.Services.RegisterService.registerCopywriterContract(
        form
      );
      console.log("stworzony copywriter to " + JSON.stringify(data.data));
      this.setState({ copywriterInvoiceData: data.data });
      if (data.data) {
        this.setState({ UserForm: {} });
        this.setState({ AddressForm: {} });
        this.setState({ ContractDataForm: {} });
        this.formRef.current.resetFields();
      }
    } catch (e) {
      console.log("error usera w registerInvoice - ");
    }
  }

  //   try {
  //     const doc = await Client.Services.UsersService.create(
  //       this.state.UserForm
  //     );
  //     console.log("data usera w handlesubmit" + JSON.stringify(doc.data));
  //     const data = doc.data;
  //     this.setState({ userData: data });
  //   } catch {
  //     console.log("error usera w registerContract");
  //   }
  //   // tworzy adres
  //   try {
  //     const doc = await Client.Services.AddressesService.create(
  //       this.state.AddressForm
  //     );
  //     const data = doc.data;
  //     this.setState({ addressData: data });
  //   } catch {
  //     console.log("error adresu w registerContract");
  //   }
  //   // tworzy copywritera z umową
  //   try {
  //     const doc = await Client.Services.CopywriterContractService.create(
  //       this.state.addressData,
  //       this.state.userData,
  //       this.state.ContractDataForm
  //     );
  //     const data = JSON.stringify(doc.data);
  //     this.setState({ copywriterContractData: data });
  //     if (this.state.copywriterContractData) {
  //       this.setState({ userForm: {} });
  //       this.setState({ addressForm: {} });
  //       this.setState({ contractDataForm: {} });
  //     }
  //   } catch {
  //     console.log("error copywritera umowy w registerContract");
  //   }
  // }

  buttonDisabled() {
    const {
      UserForm,
      CompanyDataForm,
      ContractDataForm,
      AddressForm,
      currentStep,
      contractorType,
      AgreementForm,
    } = this.state;

    return StepsControll.buttonDisabled(
      UserForm,
      CompanyDataForm,
      ContractDataForm,
      AddressForm,
      currentStep,
      contractorType,
      AgreementForm
    );
  }

  render() {
    // console.log(this.state.currentStep);

    return (
      <>
        <FormSteps
          currentStep={this.state.currentStep}
          getCurrentStep={this.setCurrentStep}
          ref={this.StepsElement}
          userForm={this.state.UserForm}
          companyDataForm={this.state.CompanyDataForm}
          contractorDataForm={this.state.ContractDataForm}
          addressForm={this.state.AddressForm}
          contractorType={this.state.contractorType}
          agreement={this.state.AgreementForm}
        ></FormSteps>
        <p></p>
        <Form
          {...LayoutConfig.layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={LayoutConfig.validateMessages}
          ref={this.formRef}
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
            getAgreementForm={this.setAgreementDataForm}
          />

          <Form.Item
            wrapperCol={{ ...LayoutConfig.layout.wrapperCol, offset: 8 }}
          >
            {this.state.currentStep === 2 ? (
              <Button
                onClick={(e) => this.handleSubmit(e)}
                type="primary"
                htmlType="submit"
                disabled={this.buttonDisabled()}
              >
                Rejestruj
              </Button>
            ) : (
              <Button
                onClick={() => this.handleClickFormNext()}
                type="primary"
                disabled={this.buttonDisabled()}
              >
                Dalej
              </Button>
            )}
          </Form.Item>

          <div>{JSON.stringify(this.state.userForm)}</div>
        </Form>
      </>
    );
  }
}

export default RegisterContract;
