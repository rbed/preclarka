export default class CopywriterInvoiceDTO {
    constructor(nazwaFirmy, regon, nip, adres, user, adresKoresp) {
       this.nazwaFirmy = nazwaFirmy;
       this.regon = regon;
       this.nip = nip;
       this.adres = adres;
       this.user = user;
       this.adresKoresp = adresKoresp;
    }
 
    getCopywriterInvoiceDTO() {
       return {
         copywriterInvoice: {
             nazwaFirmy: this.nazwaFirmy,
             regon: this.regon,
             nip: this.nip,
             adres : this.adres,
             user : this.user,
             adresKoresp : this.adresKoresp

          }
       };
    }
 }
 