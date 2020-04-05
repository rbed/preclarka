const mongoose = require("mongoose");
const Users = mongoose.model("Users");

class usersServices{
    /**
     * 
     * @param {ObjectID} ObjectID of User
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns List of Users as per id
     * @async
     */
    static getUserByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return Users.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} name - Name of user
     * @throws Error if Name not provided || MongoDB error
     * @returns List of Users as per name 
     * @async
     */
    static async getUsersByName(name){
        
        if(!name){
            throw new Error('Nie ma Name')
        }
        return await Users.find({name:name}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} lastName - lastname of User
     * @throws Error if Name not provided || MongoDB error
     * @returns List of Users as per last name
     * @async
     */
    static async getUsersByLastName(lastName){

        if(!lastName){
            throw new Error('Nie ma last name')
        }
        return await Users.find({lastname : lastName}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} name 
     * @param {String} lastName 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns list of users depends on the given parameter
     * @async
     */
    static async getUsers(id=null, name = null, lastName = null){
        if(!id && !name && !lastName) {
            return await Users.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(!id && name && !lastName) {
            return await this.getUsersByName(name)
        }
        if(!id && !name && lastName) {
            return await this.getUsersByLastName(lastName)
        }
        if(!id && name && lastName) {
            return await Users.find({name: name, lastname : lastName}).then(doc => {return doc}).catch(err => {return(err)})
        }
        if(id && !name && !lastName) {
            console.log(id);
            return await this.getUserByID(id)
        }

    }

    /** 
     * @param {object} user 
     * @returns created user data
     * @throws Error if user data not recieved || mongoDB othervise
     */
    static async createUser(user) {
        const User = new Users(user);
        return await User.save()
        .then(doc => {
            // serwis jest punktem styku pomiędzy kontrolerem i warstwa dostępu do danych
            // serwis powinien zwracać dane lub sypać błędem a nie wysyłać odpowiedzi http, to zadanie kontrolera
            // res​.​status​(​200​).​json​(doc);
            return doc
        })
        .catch(err => {
        // jak coś pojdzie nie tak to ma wyrzucic błąd
        // wyrzucony z tad błąd musi byc obsłużony w bloku try catch kontrolera
        // ​res​.​status​(​422​).​json​(err);
        throw err
        });
    }


    static async updateUser(user) {     
        console.log(user);
        try{
        const doc = await Users.findOneAndUpdate(
            { _id: user._id },
            user, {new: true});
            return {
                user: doc,
                message: "Updated"
            };
        } 
        catch(err) {
            throw err.message              
        };
    }


    static async deleteUser(id) {
        try {
            return await Users.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}  //<<< nie zwraca nic chce usunąć usera podając błędne id
        };
    }
}

module.exports = usersServices






