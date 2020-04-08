const mongoose = require("mongoose");
const CopywritersInvoice = mongoose.model("CopywritersInvoice");

class CopywritersInvoiceServices{
    /**
     * @param {ObjectID} ObjectID of Invoice
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns CopywritersInvoice as per id
     * @async
     * x
     */
    static getByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return CopywritersInvoice.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
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
            return await CopywritersInvoice.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(id) {
            return await this.getByID(id)
        }

    }

    /** 
     * @param {object} copywriterInvoice
     * @returns created invoice data
     * @throws Error if invoice data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(copywriterInvoice) {
        if (!copywriterInvoice.nazwaFirmy || !copywriterInvoice.regon || !copywriterInvoice.nip || !copywriterInvoice.kwota1000) {
            throw new Error("podana FV nie zawiera kompletu informacji")
        }
        console.log('dupa');
        const Copywriter = new CopywritersInvoice(copywriterInvoice);
        return await Copywriter.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
        throw err
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
        if(!copywriterInvoice._id) {
            throw new Error("przekazany objekt invoice nie ma id")
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
            throw err        
        };
    }


    /**
     * 
     * @param {String} id
     * @throes Error if lack of id or there is no invoice with provided id 
     * @returns deleted invoice
     * @async
     * x
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw Error("brak id")
        }
        try {
            return await CopywritersInvoice.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}  //<<< nie zwraca nic chce usunąć usera podając błędne id
        };
    }
}

module.exports = CopywritersInvoiceServices






