import Request from '../../Requests/Request'
import API from '../../API'
import Address from './AddressDTO'
// TODO: tu import classy DTO


class AddressesService {
  static async get() {
    try {
      const doc = await Request.get(API.ROUTES.Addresses.GET_ADDRESSES);
      // Request.get(API.ROUTES.EMPLOYEES.GET_EMPLOYEE_BY_ID + id) <<<<<<<<<<<< coś takiego tu powinno być
      // TODO: tu pownie trzeba zamienić to co przyszlo na DTO
      return doc;
    } catch {}
  }

  static async getById(id){
    try {
      const doc = await Request.getById(API.ROUTES.Addresses.GET_ADDRESS_BY_ID, id)
      return doc
    } catch (err) {console.log("error")}   
  }

  static async create(adres){
    const {ulica, nrBudynku, nrLokalu, kodPocz, miasto, kraj} = adres
    const address = new Address(ulica, nrBudynku, nrLokalu, kodPocz, miasto, kraj)
    try {
      const doc = await Request.post(API.ROUTES.Addresses.CREATE_ADDRESS,{address});
      return doc;
    } catch (err) {
      console.log('error AddressService inside');
    }
  }


  static async update (item) {
    try {
      const doc = await Request.update(API.ROUTES.Addresses.UPDATE_ADDRESS, item)
    return doc    }
    catch (err) {
      
    }
  }

  static async delete (id) {
    try {
      const doc = Request.delete(API.ROUTES.Addresses.DELETE_ADDRESS_BY_ID, id)
      return doc
    }
    catch {

    }
  }

}

export default AddressesService;
