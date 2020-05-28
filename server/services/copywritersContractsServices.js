const mongoose = require("mongoose");
const CopywritersContract = mongoose.model("CopywritersContract");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class CopywritersContractServices{
    /**
     * @param {ObjectID} ObjectID of copywriter
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns CopywritersContract as per id
     * @async
     * x
     */
    static getByID(id){
        return CopywritersContract.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw Error('brak id')
        })
    }

    /**
     * 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns CopywritersContract depends on the given id
     * @async
     * x
     */
    static async getAll(id=null){
        if(!id) {
            return await CopywritersContract.find().then(doc=>{return doc}).catch(err=>{throw new AppError('coś nie tak z baza danych', MONGO_ERROR, err)})
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
     * @param {object} copywriterContracts
     * @returns created copywriter data
     * @throws Error if copywriter data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(copywriterContract) {
        if (!copywriterContract) {
            throw new AppError('nie podałeś copywritera', MONGO_ERROR, err)
        }
        const Copywriter = new CopywritersContract(copywriterContract);
        return await Copywriter.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            throw new AppError('blad mongodb', MONGO_ERROR, err)
        });
    }


    /**
     * 
     * @param {Object} copywriterContract 
     * @throws Error if id of the copywriter you want to update not exist or if Provided user object has no id
     * @returns updated copywriter
     * @async
     * 
     */
    static async update(copywriterContract) {   
        if(!copywriterContract || !copywriterContract._id) {
            throw new AppError('brak copywritera do aktualizacji', ARGUMENT_ERROR)
        }
        try{
        const doc = await CopywritersContract.findOneAndUpdate(
            { _id: copywriterContract._id },
            copywriterContract, {new: true}); 
            return {
                copywriterContract: doc,
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
     * @throes Error if lack of id or there is no copywriter with provided id 
     * @returns deleted copywriter
     * @async
     * 
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw new AppError('brak id - arg err', ARGUMENT_ERROR)
        }
        try {
            return await CopywritersContract.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = CopywritersContractServices






