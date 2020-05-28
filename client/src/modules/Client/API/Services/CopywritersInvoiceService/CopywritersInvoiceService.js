import Request from "../../Requests/Request";
import API from "../../API";
import CopywriterInvoicetDTO from "./CopywriterInvoiceDTO";

class CopywritersInvoiceService {
  static async get() {
    try {
      const doc = await Request.get(
        API.ROUTES.CopywritersInvoice.GET_COPYWRITERS
      );
      // Request.get(API.ROUTES.EMPLOYEES.GET_EMPLOYEE_BY_ID + id) <<<<<<<<<<<< coś takiego tu powinno być
      // TODO: tu pownie trzeba zamienić to co przyszlo na DTO
      return doc;
    } catch {}
  }

  static async getById(id) {
    try {
      const doc = await Request.getById(
        API.ROUTES.CopywritersInvoice.GET_COPYWRITERS_BY_ID,
        id
      );
      return doc;
    } catch (err) {
      console.log("error");
    }
  }

  static async create(adresId, userId, companyData) {
    const {
      nazwaFirmy,
      regon,
      nip
    } = companyData;
    // const user = userData._id;
    // const adres = adresData._id;
    // TODO: adres koresponsdencyjny może być inne
    const adresKoresp = adresId;
    const copywriterInvoice = new CopywriterInvoicetDTO(
      nazwaFirmy,
      regon,
      nip,
      adresId,
      userId,
      adresKoresp
    );
    console.log("copywriter przekazywany do stworzneia adresu " + copywriterInvoice);
    try {
      const doc = await Request.post(
        API.ROUTES.CopywritersInvoice.CREATE_COPYWRITERS,
        { copywriterInvoice }
      );
      return doc;
    } catch (err) {
      console.log("error Client copywriterInvoiceService ");
    }
  }

  static async update(item) {
    try {
      const doc = await Request.update(
        API.ROUTES.CopywritersInvoice.UPDATE_COPYWRITERS,
        item
      );
      return doc;
    } catch (err) {}
  }

  static async delete(id) {
    try {
      const doc = Request.delete(
        API.ROUTES.CopywritersInvoice.DELETE_COPYWRITERS_BY_ID,
        id
      );
      return doc;
    } catch {}
  }
}

export default CopywritersInvoiceService;
