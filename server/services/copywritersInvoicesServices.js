const mongoose = require("mongoose");
const CopywritersInvoice = mongoose.model("CopywritersInvoice");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class CopywritersInvoiceServices{
    /**
     * @param {ObjectID} ObjectID of Invoice
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns CopywritersInvoice as per id
     * @async
     * x
     */
    static getByID(id){
        return CopywritersInvoice.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw Error('brak id')
        })
    }

    /**
     * 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns CopywritersInvoice depends on the given id
     * @async
     * x
     */
    static async getAll(id=null){
        if(!id) {
            return await CopywritersInvoice.find().then(doc=>{return doc}).catch(err=>{throw new AppError('coś nie tak z baza danych', MONGO_ERROR, err)})
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
     * @param {object} copywriterInvoice
     * @returns created copywriter data
     * @throws Error if copywriter data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(copywriterInvoice) {
        if (!copywriterInvoice) {
            throw new AppError('brak copywritera', ARGUMENT_ERROR)
        }
        console.log('copywritersInvoiceService');
        const Copywriter = new CopywritersInvoice(copywriterInvoice);
        return await Copywriter.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            console.log("error przy Tworzeniu copywriteraInvoice")
            // throw new AppError('blad mongodb', MONGO_ERROR, err)
        });
    }

    /**
     * 
     * @param {Object} copywriterInvoice 
     * @throws Error if id of the invoice you want to update not exist or if Provided user object has no id
     * @returns updated copywriter
     * @async
     * x
     */
    static async update(copywriterInvoice) {     
        console.log(copywriterInvoice);
        if(!copywriterInvoice || !copywriterInvoice._id) {
            throw new AppError('brak copywritera do aktualizacji', ARGUMENT_ERROR)
        }
        try{
        const doc = await CopywritersInvoice.findOneAndUpdate(
            { _id: copywriterInvoice._id },
            copywriterInvoice, {new: true}); 
            return {
                copywriterInvoice: doc,
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
     * x
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw new AppError('brak id - arg err', ARGUMENT_ERROR)
        }
        try {
            return await CopywritersInvoice.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = CopywritersInvoiceServices






