import axios from "axios";
import Request from '../../Requests/Request'
import Address from './OrdersDTO'
// TODO: tu import classy DTO


class OrdersService {
  static async get() {
    try {
      const doc = await Request.get("/api/orders");
      // TODO: tu pownie trzeba zamienić to co przyszlo na DTO
      return doc;
    } catch {}
  }

  static async create(item){
    const {temat, ileArt, dlugoscArt, wartosc, komentarzOdrzucenia, created} = item
    const order = new Address(temat, ileArt, dlugoscArt, wartosc, komentarzOdrzucenia, created)
    try {
      const doc = await Request.post("/api/orders",{order});
      return doc;
    } catch (err) {
      console.log('error inside');
    }
  }
}

export default OrdersService;
