import Request from "../../Requests/Request";
import API from "../../API";
import CopywriterContractDTO from "./CopywriterContractDTO";

class CopywritersContractService {
  static async get() {
    try {
      const doc = await Request.get(
        API.ROUTES.CopywritersContract.GET_COPYWRITERS
      );
      // Request.get(API.ROUTES.EMPLOYEES.GET_EMPLOYEE_BY_ID + id) <<<<<<<<<<<< coś takiego tu powinno być
      // TODO: tu pownie trzeba zamienić to co przyszlo na DTO
      return doc;
    } catch {}
  }

  static async getById(id) {
    try {
      const doc = await Request.getById(
        API.ROUTES.CopywritersContract.GET_COPYWRITERS_BY_ID,
        id
      );
      return doc;
    } catch (err) {
      console.log("error");
    }
  }

  static async create(adresData, userData, contractData) {
    const {
      dataUrodzenia,
      imieMatki,
      imieOjca,
      nrDowodu,
      pesel,
      nip,
    } = contractData;
    const user = userData._id;
    const adres = adresData._id;
    // TODO: adres koresponsdencyjny może być inne
    const adresKoresp = adresData._id;
    const copywriterContract = new CopywriterContractDTO(
      dataUrodzenia,
      imieMatki,
      imieOjca,
      nrDowodu,
      pesel,
      nip,
      adres,
      user,
      adresKoresp
    );
    console.log("copywriter przekazywany do stworzneia adresu " + copywriterContract);
    try {
      const doc = await Request.post(
        API.ROUTES.CopywritersContract.CREATE_COPYWRITERS,
        { copywriterContract }
      );
      return doc;
    } catch (err) {
      console.log("error Client CopywriterContractService ");
    }
  }

  static async update(item) {
    try {
      const doc = await Request.update(
        API.ROUTES.CopywritersContract.UPDATE_COPYWRITERS,
        item
      );
      return doc;
    } catch (err) {}
  }

  static async delete(id) {
    try {
      const doc = Request.delete(
        API.ROUTES.CopywritersContract.DELETE_COPYWRITERS_BY_ID,
        id
      );
      return doc;
    } catch {}
  }
}

export default CopywritersContractService;
