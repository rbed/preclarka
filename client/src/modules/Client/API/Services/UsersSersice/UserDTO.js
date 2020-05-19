export default class User {
    constructor(email, name, lastname, password) {
      this.email = email;
      this.name = name;
      this.lastname = lastname;
      // this.password = password;
    }
 
    getUserDTO() {
       return {
          user: {
            email : this.email,
            name: this.name,
            lastname :this.lastname,
            // password: this.password,
          }
       };
    }
 }
 