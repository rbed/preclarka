const mongoose = require("mongoose");
const Seos = mongoose.model("Seos");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class SeosServices{
    /**
     * 
     * @param {ObjectID} ObjectID of User
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns List of Seos as per id
     * @async
     * x
     */
    static getByID(id){
        if(!id){
            throw new Error('Nie ma ID')
            // throw new AppError('coś nie tak z baza danych', MONGO_ERROR)
            // ktore z powyższych powinienem dać/
        }
        return Seos.findById({_id : id}).then(doc =>{
            if (doc.length === 0) {
                throw Error('nie ma takiego name w bazie')
            }
            return doc
        }).catch(err =>{
            throw new AppError('ID niepoprawne', MONGO_ERROR, err)
        })
    }

    /**
     * 
     * @param {String} name 
     * @param {String} lastname 
     * @param {String} id 
     * @throws AppError : lack of parameter || MongoDB Err
     * @returns list of Seos depends on the given parameter
     * @async
     * x
     */
    static async getAll(id=null){
        if(!id) {
            return await Seos.find()
            .then(doc=>{return doc})
            .catch(err=>{throw new AppError('coś nie tak z baza danych', MONGO_ERROR, err)})
        }
        if(id) {
            try {
                return await this.getByID(id)
             }
             catch(err) {
                 throw  err//new AppError('ID niepoprawne', MONGO_ERROR)
             }
        }

    }

    /** 
     * @param {object} seo
     * @returns created user data
     * @throws Error if user data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(seo) {
        if (!seo) {
            throw new AppError('brak zamowienia do aktualizacji', ARGUMENT_ERROR)
        }
        const Seo = new Seos(seo);
        return await Seo.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            throw new AppError('blad mongodb', MONGO_ERROR, err)
        });
    }


    /**
     * 
     * @param {Object} seo 
     * @throws Error if id of the user you want to update not exist or if Provided user object has no id
     * @returns updated seo
     * @async
     * x
     */
    static async update(seo) {     
        if(!seo || !seo._id) {
            throw new AppError('brak seo do edycji', ARGUMENT_ERROR)
        }
        try{
        const doc = await Seos.findOneAndUpdate(
            { _id: seo._id },
            seo, {new: true});
            return {
                seo: doc,
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
     * @throes Error if lack of id or there is no seo with the provided id 
     * @returns deleted seo
     * @async
     * x
     */
    static async delete(id) {
        if (!id) {
            throw Error("brak id")
        }
        try {
            return await Seos.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = SeosServices






