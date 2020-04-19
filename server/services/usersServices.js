const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class usersServices{
    /**
     * 
     * @param {ObjectID} ObjectID of User
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns List of Users as per id
     * @async
     */
    static getByID(id){
        if(!id){
            throw new AppError('nie podałes id', ARGUMENT_ERROR)
        }
        return Users.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw new AppError('ID niepoprawne', MONGO_ERROR)
        })
    }

    /**
     * 
     * @param {String} name - Name of user
     * @throws Error if Name not provided || MongoDB error
     * @returns List of Users as per name 
     * @async
     */
    static async getByName(name){
        console.log(name);
        if(!name){
            throw Error('brak name')
        }
        return await Users.find({name:name})
        .then(doc =>{
            if (doc.length === 0) {
                console.log(doc.length);
                throw new AppError('brak seo z takim name', MONGO_ERROR)
            }
            return doc})
        .catch(err =>{
            throw new AppError('brak seo z takim name', MONGO_ERROR)
        })
    }

    /**
     * 
     * @param {String} lastName - lastname of User
     * @throws Error if Name not provided || MongoDB error
     * @returns List of Users as per last name
     * @async
     */
    static async getByLastName(lastName){

        if(!lastName){
            throw new AppError('nie podales lastname', ARGUMENT_ERROR)
        }
        return await Users.find({lastname : lastName}).then(doc =>{
            if (doc.length === 0) {
                console.log(doc.length);
                throw new AppError('brak seo z takim lastname', MONGO_ERROR)
            }
            return doc
        }).catch(err =>{
            throw new AppError('brak seo z takim lastname', MONGO_ERROR)
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
            return await Users.find().then(doc=>{return doc}).catch(err=>{throw new AppError('brak zamowienia do aktualizacji', ARGUMENT_ERROR, err)})
        }
        if(!id && name && !lastName) {
            return await this.getByName(name)
        }
        if(!id && !name && lastName) {
            return await this.getByLastName(lastName)
        }
        if(!id && name && lastName) {
            return await Users.find({name: name, lastname : lastName}).then(doc => {return doc}).catch(err => {return(err)})
        }
        if(id && !name && !lastName) {
            console.log(id);
            return await this.getByID(id)
        }

    }

    /** 
     * @param {object} user 
     * @returns created user data
     * @throws Error if user data not recieved || mongoDB othervise or if user object has no enough data
     */
    static async create(user) {
        if (!user) {
            throw new AppError('nie podales uzytkownika do utworzenia', ARGUMENT_ERROR)
        }
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
        throw new AppError('blad mongodb', MONGO_ERROR, err)
        });
    }

    static async createMany(users) {
        console.log('jestem');  
        if (!users) {
          throw new AppError("brak adresów", ARGUMENT_ERROR);
        }
        for(var u in users)
          await this.create(users [u]);
      }

    /**
     * 
     * @param {Object} user 
     * @throws Error if id of the user you want to update not exist or if Provided user object has no id
     * @returns updated user
     * @async
     */
    static async update(user) {     
        if(!user  || !user._id) {
            throw new AppError('brak usera do edycji', ARGUMENT_ERROR)
        }
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
            throw new AppError('blad mongodb', MONGO_ERROR, err)       
        };
    }


    /**
     * 
     * @param {String} id
     * @throes Error if lack of id or there is no user with the provided id 
     * @returns deleted user
     * @async
     */
    static async delete(id) {
        if (!id) {
            throw new AppError('brak id', ARGUMENT_ERROR)
        }
        try {
            return await Users.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = usersServices






