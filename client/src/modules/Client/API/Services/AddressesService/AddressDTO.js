export default class Address {
    constructor(ulica, nrDomu, nrLokalu, kodPocz, miasto, kraj) {
       this.ulica = ulica;
       this.nrDomu = nrDomu;
       this.nrLokalu = nrLokalu
       this.kodPocz = kodPocz;
       this.miasto = miasto;
       this.kraj = kraj;
    }
 
    getAddressDTO() {
       return {
          address: {
             ulica: this.ulica,
             nrDomu: this.nrDomu,
             nrLokalu: this.nrLokalu,
             kodPocz: this.kodPocz,
             miasto: this.miasto,
             kraj: this.kraj
          }
       };
    }
 }
 