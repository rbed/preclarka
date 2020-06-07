class StepsControll {

    static buttonDisabled(UserForm, CompanyDataForm, ContractDataForm, AddressForm, currentStep, contractorType, Agreement) {
        // const { UserForm, CompanyDataForm, AddressForm, currentStep } = this.state;

        // console.log(Agreement)
    
        if (StepsControll.checkIFUserFormIsFulfil(UserForm) && currentStep === 0) {
          return true;
        } else if (
          !StepsControll.checkIFUserFormIsFulfil(UserForm) &&
          currentStep === 0
        ) {
          return false;
        } else if (
          currentStep === 1 && contractorType === "invoice" &&  StepsControll.checkIfCompanyFormIsFulfil(CompanyDataForm, contractorType)
        ) {
          return true;
        } else if (
          currentStep === 1 && contractorType === "invoice" && !StepsControll.checkIfCompanyFormIsFulfil(CompanyDataForm, contractorType)
        ) {
          return false;
        } else if (
          currentStep === 1 && contractorType === "contract" && StepsControll.checkIfContractorFormIsFulfil(ContractDataForm, contractorType) 
        ) {
          return true;
        } else if (
          currentStep === 1 && contractorType === "contract" && !StepsControll.checkIfContractorFormIsFulfil(ContractDataForm, contractorType)
        ) {
          return false;
        } else if (
          (StepsControll.checkIfAddressFormIsFulfil(AddressForm) || !Agreement) && currentStep === 2
        )
          return true;
          else if (
          !StepsControll.checkIfAddressFormIsFulfil(AddressForm) && Agreement && currentStep === 2
        )
          return false;
      }

    static checkIFUserFormIsFulfil(userForm) {
      if(userForm){const { email, name, lastname, password, confirm } = userForm
        if (
            email &&
            name &&
            lastname &&
            password &&
            confirm
          ) {
            return false;
          } else if (
            !email ||
            !name ||
            !lastname ||
            !password ||
            !confirm 
          ) {
            return true;
          }} else return true;
    }

    static checkIfCompanyFormIsFulfil(CompanyDataForm, type){
      if(CompanyDataForm) {
        const { nazwaFirmy, regon, nip } = CompanyDataForm
        // console.log("to jest companydataform w stepscontrolle" + type)
        if (!nazwaFirmy || !regon || !nip) {
            return true;
          } else if (nazwaFirmy && regon && nip) {
            return false;
          }} else return true;
    }

    static checkIfContractorFormIsFulfil(ContractDataForm, type){
      if(ContractDataForm){
        const { dataUrodzenia, imieMatki, imieOjca, nrDowodu, pesel, nip } = ContractDataForm
        if (!dataUrodzenia || !imieMatki || !imieOjca || !nrDowodu || !pesel || !nip) {
            return true;
          } else return false;
    }}
    

    static checkIfAddressFormIsFulfil(addressForm, currentStep) {
      if (addressForm){
        const { ulica, nrDomu, miasto, kodPocz, kraj } = addressForm

        if (
            !ulica ||
            !nrDomu ||
            !miasto ||
            !kodPocz ||
            !kraj
          ) {
            return true;
          } else if (
            ulica &&
            nrDomu &&
            miasto &&
            kodPocz &&
            kraj
          ) {
            return false;
          }
        } else return true
    }
}

export default StepsControll