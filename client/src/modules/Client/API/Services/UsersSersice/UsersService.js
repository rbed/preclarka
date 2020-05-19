import Request from '../../Requests/Request'
import API from '../../API'
import User from './UserDTO'
// TODO: tu import classy DTO


class UsersService {
  static async get() {
    try {
      const doc = await Request.get(API.ROUTES.Users.GET_USERS);
      // Request.get(API.ROUTES.EMPLOYEES.GET_EMPLOYEE_BY_ID + id) <<<<<<<<<<<< coś takiego tu powinno być
      // TODO: tu pownie trzeba zamienić to co przyszlo na DTO
      return doc;
    } catch {}
  }

  static async getById(id){
    try {
      const doc = await Request.getById(API.ROUTES.Users.GET_USERS_BY_ID, id)
      return doc
    } catch (err) {console.log("error")}   
  }


  static async create(item){
    const {email, name, lastname} = item // tu jeszcze można pobrać haslo
    const user = new User(email, name, lastname)
    try {
      const doc = await Request.post(API.ROUTES.Users.CREATE_USERS,{user});
      console.log('user w userservice create ' + JSON.stringify(doc.data))
      return doc;
    } catch (err) {
      console.log('error inside userservices - createuser');
    }
  }


  static async update (item) {
    try {
      const doc = await Request.update(API.ROUTES.Users.UPDATE_USERS, item)
    return doc    }
    catch (err) {
      
    }
  }


  static async delete (id) {
    try {
      const doc = Request.delete(API.ROUTES.Users.DELETE_USERS_BY_ID, id)
      return doc
    }
    catch {

    }
  }

}

export default UsersService;
