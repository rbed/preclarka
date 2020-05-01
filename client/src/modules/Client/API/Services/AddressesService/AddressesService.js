import axios from "axios";
import Request from '../../Requests/Request'
import Address from './AddressDTO'
// TODO: tu import classy DTO


class AddressesService {
  static async get() {
    try {
      const doc = await Request.get("/api/addresses");
      // TODO: tu pownie trzeba zamienić to co przyszlo na DTO
      return doc;
    } catch {}
  }

  static async create(item){
    const {street, houseNumb, apartNumb, postcode, city, country} = item
    const address = new Address(street, houseNumb, apartNumb, postcode, city, country)
    try {
      const doc = await Request.post("/api/addresses",{address});
      return doc;
    } catch (err) {
      console.log('error inside');
    }
  }
}

export default AddressesService;
