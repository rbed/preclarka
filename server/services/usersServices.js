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
        console.log('test getby id');
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
    static async getUsers(name = null, lastName = null, id=null){
        if(!name && !lastName && !id) {
            return await Users.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(name && !lastName && !id) {
            return await this.getUsersByName(name)
        }
        if(!name && lastName && !id) {
            return await this.getUsersByLastName(lastName)
        }
        if(name && lastName && !id) {
            return await Users.find({name: name, lastname : lastName}).then(doc => {return doc}).catch(err => {return(err)})
        }
        if(!name && !lastName && id) {
            console.log(id);
            return await this.getUserByID(id)
        }

    }


    static async createUser(user){
        //save adres
        console.log('to jest user' + user);
        var User = new Users(user);
        //return status
        return await User.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(422).json(err);
        });

    }

}

module.exports = usersServices

