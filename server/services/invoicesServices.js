const mongoose = require("mongoose");
const Invoices = mongoose.model("Invoices");

class InvoicesServices{
    /**
     * @param {ObjectID} ObjectID of Invoice
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns Invoices as per id
     * @async
     * x
     */
    static getByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return Invoices.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
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
            return await Invoices.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(id) {
            return await this.getByID(id)
        }

    }

    /** 
     * @param {object} invoice
     * @returns created invoice data
     * @throws Error if invoice data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(invoice) {
        if (!invoice.numer || !invoice.path || !invoice.fileName) {
            throw new Error("podana FV nie zawiera kompletu informacji")
        }
        const Invoice = new Invoices(invoice);
        return await Invoice.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
        throw err
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
        if(!invoice._id) {
            throw new Error("przekazany objekt invoice nie ma id")
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
            throw err        
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
            throw Error("brak id")
        }
        try {
            return await Invoices.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}  //<<< nie zwraca nic chce usunąć usera podając błędne id
        };
    }
}

module.exports = InvoicesServices






