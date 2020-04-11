const mongoose = require("mongoose");
const Contracts = mongoose.model("Contracts");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class ContractServices{
    /**
     * @param {ObjectID} ObjectID of contracts
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns Contracts as per id
     * @async
     * x
     */
    static getByID(id){
        return Contracts.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw Error('brak id - blad ze zwyklej klasy error')
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
            return await Contracts.find().then(doc=>{return doc}).catch(err=>{throw new AppError('coś nie tak z baza danych', MONGO_ERROR, err)})
        }
        if(id) {
            try {
                return await this.getByID(id)
             }
             catch(err) {
                 throw new AppError('ID niepoprawne', MONGO_ERROR)
             }
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
        if (!contract) {
            throw new AppError('brak adresu', ARGUMENT_ERROR)
        }
        const Contract = new Contracts(contract);
        return await Contract.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            throw new AppError('blad mongodb', MONGO_ERROR, err)
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
            throw new AppError('brak umowy do aktualizacji', ARGUMENT_ERROR)
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
            throw new AppError('blad mongodb', MONGO_ERROR, err)    
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
            throw new AppError('brak id - arg err', ARGUMENT_ERROR)
        }
        try {
            return await Contracts.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = ContractServices






