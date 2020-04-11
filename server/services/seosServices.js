const mongoose = require("mongoose");
const Seos = mongoose.model("Seos");

class SeosServices{
    /**
     * 
     * @param {ObjectID} ObjectID of User
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns List of Seos as per id
     * @async
     * x
     */
    static getSeoByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return Seos.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} name - Name of seo
     * @throws Error if Name not provided || MongoDB error
     * @returns List of Seos as per name 
     * @async
     * x
     */
    static async getSeosByName(name){
        
        if(!name){
            throw new Error('Nie ma Name')
        }
        return await Seos.find({name:name}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} lastname - lastname of Seo
     * @throws Error if Name not provided || MongoDB error
     * @returns List of Seos as per last name
     * @async
     * x
     */
    static async getSeosBylastname(lastname){

        if(!lastname){
            throw new Error('Nie ma last name')
        }
        return await Seos.find({lastname : lastname}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} name 
     * @param {String} lastname 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns list of Seos depends on the given parameter
     * @async
     * x
     */
    static async getSeos(id=null, name = null, lastname = null){
        if(!id && !name && !lastname) {
            return await Seos.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(!id && name && !lastname) {
            return await this.getSeosByName(name)
        }
        if(!id && !name && lastname) {
            return await this.getSeosBylastname(lastname)
        }
        if(!id && name && lastname) {
            return await Seos.find({name: name, lastname : lastname}).then(doc => {return doc}).catch(err => {return(err)})
        }
        if(id && !name && !lastname) {
            return await this.getSeoByID(id)
        }

    }

    /** 
     * @param {object} seo
     * @returns created user data
     * @throws Error if user data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async createSeo(seo) {
        console.log(seo.user);
        if (!seo.user) {
            throw new Error("podany seowiec nie zawiera kompletu informacji")
        }
        const Seo = new Seos(seo);
        return await Seo.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
        throw err
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
    static async updateSeo(seo) {     
        if(!seo || !seo._id) {
            throw new Error("przekazany objekt seo nie ma id")
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
            throw err        
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
    static async deleteSeo(id) {
        if (!id) {
            throw Error("brak id")
        }
        try {
            return await Seos.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}  //<<< nie zwraca nic chce usunąć usera podając błędne id
        };
    }
}

module.exports = SeosServices






