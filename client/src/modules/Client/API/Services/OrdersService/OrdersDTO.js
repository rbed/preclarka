export default class Address {
    constructor(temat, ileArt, dlugoscArt, wartosc=0, komentarzOdrzucenia=null, created) {
       this.temat = temat;
       this.ileArt = ileArt;
       this.dlugoscArt = dlugoscArt
       this.wartosc = wartosc;
       this.komentarzOdrzucenia = komentarzOdrzucenia;
       this.created = created;
    }
 
    getAddressDTO() {
       return {
          address: {
             temat: this.temat,
             ileArt: this.ileArt,
             dlugoscArt: this.dlugoscArt,
             wartosc: this.wartosc,
             komentarzOdrzucenia: this.komentarzOdrzucenia,
             created: this.created
          }
       };
    }
 }
 