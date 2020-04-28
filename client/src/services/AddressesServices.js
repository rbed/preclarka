import axios from "axios";
// TODO: tu import classy PDO


class AddressesService {
  static async get() {
    try {
      const doc = await axios.get("/api/addresses");
      // TODO: tu pownie trzeba zamienić to co przyszlo na PDO
      return doc;
    } catch {}
  }

  static async create(item){
    console.log(item)
    const address = {
      ulica: item.street,
      nrDomu: item.houseNumb,
      nrLokalu: item.apartNumb,
      miasto: item.city,
      kodPocz: item.postcode,
      kraj: item.country
    }
    console.log(address);
    try {
      const doc = await axios.post("/api/addresses", {address});
      return doc;
    } catch (err) {
      console.log('error inside');
    }
  }
}

export default AddressesService;
