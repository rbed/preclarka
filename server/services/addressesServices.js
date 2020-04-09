const mongoose = require("mongoose");
const Addresses = mongoose.model("Addresses");

class AddressesServices{
    /**
     * @param {ObjectID} ObjectID of Addresses
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns Addresses as per id
     * @async
     * x
     */
    static getByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return Addresses.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns Addresses depends on the given id
     * @async
     * x
     */
    static async getAll(id=null){
        if(!id) {
            return await Addresses.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(id) {
            return await this.getByID(id)
        }

    }

    /** 
     * @param {object} address
     * @returns created address data
     * @throws Error if address data not recieved || mongoDB othervise or if address object has no enough data
     * x
     */
    static async create(address) {
        console.log(address);
        if (!address.ulica || !address.nrDomu) {
            throw new Error("podana FV nie zawiera kompletu informacji")
        }
        const Address = new Addresses(address);
        return await Address.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
        throw err
        });
    }


    /**
     * 
     * @param {Object} address
     * @throws Error if id of the address you want to update not exist or if Provided address object has no id
     * @returns updated address
     * @async
     * x
     */
    static async update(address) {   
        if(!address._id) {
            throw new Error("przekazany objekt invoice nie ma id")
        }
        try{
        const doc = await Addresses.findOneAndUpdate(
            { _id: address._id },
            address, {new: true}); 
            return {
                address: doc,
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
     * @throes Error if lack of id or there is no address with provided id 
     * @returns deleted address
     * @async
     * x
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw Error("brak id")
        }
        try {
            return await Addresses.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}
        };
    }
}

module.exports = AddressesServices






