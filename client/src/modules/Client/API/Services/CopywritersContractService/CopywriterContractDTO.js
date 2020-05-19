export default class CopywriterContractDTO {
    constructor(dataUrodzenia, imieMatki, imieOjca, nrDowodu, pesel, nip, adres, user, adresKoresp) {
       this.dataUrodzenia = dataUrodzenia;
       this.imieMatki = imieMatki;
       this.imieOjca = imieOjca
       this.nrDowodu = nrDowodu;
       this.pesel = pesel;
       this.nip = nip;
       this.adres = adres;
       this.user = user;
       this.adresKoresp = adresKoresp;
    }
 
    getAddressDTO() {
       return {
         copywriterContract: {
             dataUrodzenia: this.dataUrodzenia,
             imieMatki: this.imieMatki,
             imieOjca: this.imieOjca,
             nrDowodu: this.nrDowodu,
             pesel: this.pesel,
             nip: this.nip,
             adres : this.adres,
             user : this.user,
             adresKoresp : this.adresKoresp

          }
       };
    }
 }
 