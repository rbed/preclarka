const mongoose = require("mongoose");
const Contracts = mongoose.model("Contracts");

class ContractServices{
    /**
     * @param {ObjectID} ObjectID of contracts
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns Contracts as per id
     * @async
     * x
     */
    static getByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return Contracts.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
        })
    }

    /**
     * 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns Contracts depends on the given id
     * @async
     * x
     */
    static async getAll(id=null){
        if(!id) {
            return await Contracts.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(id) {
            return await this.getByID(id)
        }

    }

    /** 
     * @param {object} contracts
     * @returns created contract data
     * @throws Error if contract data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(contract) {
        console.log(contract);
        if (!contract.numer || !contract.path || !contract.fileName) {
            throw new Error("podana FV nie zawiera kompletu informacji")
        }
        const Contract = new Contracts(contract);
        return await Contract.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
        throw err
        });
    }


    /**
     * 
     * @param {Object} contract 
     * @throws Error if id of the contract you want to update not exist or if Provided user object has no id
     * @returns updated contract
     * @async
     * x
     */
    static async update(contract) {   
        if(!contract._id) {
            throw new Error("przekazany objekt invoice nie ma id")
        }
        try{
        const doc = await Contracts.findOneAndUpdate(
            { _id: contract._id },
            contract, {new: true}); 
            return {
                contract: doc,
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
     * @throes Error if lack of id or there is no contract with provided id 
     * @returns deleted contract
     * @async
     * x
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw Error("brak id")
        }
        try {
            return await Contracts.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}
        };
    }
}

module.exports = ContractServices






