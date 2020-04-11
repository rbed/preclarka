const mongoose = require("mongoose");
const Invoices = mongoose.model("Invoices");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class InvoicesServices{
    /**
     * @param {ObjectID} ObjectID of Invoice
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns Invoices as per id
     * @async
     * x
     */
    static getByID(id){
        return Invoices.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw Error('brak id - blad ze zwyklej klasy error')
        })
    }

    /**
     * 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns Invoices depends on the given id
     * @async
     * x
     */
    static async getAll(id=null){
        if(!id) {
            return await Invoices.find().then(doc=>{return doc}).catch(err=>{throw new AppError('coś nie tak z baza danych', MONGO_ERROR, err)})
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
     * @param {object} invoice
     * @returns created invoice data
     * @throws Error if invoice data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(invoice) {
        if (!invoice) {
            throw new AppError('brak faktury', ARGUMENT_ERROR)
        }
        const Invoice = new Invoices(invoice);
        return await Invoice.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            throw new AppError('blad mongodb', MONGO_ERROR, err)
        });
    }


    /**
     * 
     * @param {Object} invoice 
     * @throws Error if id of the invoice you want to update not exist or if Provided user object has no id
     * @returns updated invoice
     * @async
     * x
     */
    static async update(invoice) {     
        console.log(invoice);
        if(!invoice || !invoice._id) {
            throw new AppError('brak faktury do aktualizacji', ARGUMENT_ERROR)
        }
        try{
        const doc = await Invoices.findOneAndUpdate(
            { _id: invoice._id },
            invoice, {new: true}); 
            return {
                invoice: doc,
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
     * @throes Error if lack of id or there is no invoice with provided id 
     * @returns deleted invoice
     * @async
     * 
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw new AppError('brak id - arg err', ARGUMENT_ERROR)
        }
        try {
            return await Invoices.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = InvoicesServices






