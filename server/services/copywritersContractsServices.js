const mongoose = require("mongoose");
const CopywritersContract = mongoose.model("CopywritersContract");

class CopywritersContractServices{
    /**
     * @param {ObjectID} ObjectID of copywriter
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns CopywritersContract as per id
     * @async
     * x
     */
    static getByID(id){
        if(!id){
            throw new Error('Nie ma ID')
        }
        return CopywritersContract.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
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
            return await CopywritersContract.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(id) {
            return await this.getByID(id)
        }

    }

    /** 
     * @param {object} copywriterContracts
     * @returns created copywriter data
     * @throws Error if copywriter data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(copywriterContract) {
        if (!copywriterContract.dataUrodzenia || !copywriterContract.imieMatki || !copywriterContract.imieOjca || !copywriterContract.nrDowodu || !copywriterContract.pesel || !copywriterContract.nip || !copywriterContract.stanKonta || !copywriterContract.kwota1000) {
            throw new Error("podana FV nie zawiera kompletu informacji")
        }
        console.log('dupa');
        const Copywriter = new CopywritersContract(copywriterContract);
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
     * @param {Object} copywriterContract 
     * @throws Error if id of the copywriter you want to update not exist or if Provided user object has no id
     * @returns updated copywriter
     * @async
     * x
     */
    static async update(copywriterContract) {   
        if(!copywriterContract._id) {
            throw new Error("przekazany objekt invoice nie ma id")
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
            throw err        
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
            throw Error("brak id")
        }
        try {
            return await CopywritersContract.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}  //<<< nie zwraca nic chce usunąć usera podając błędne id
        };
    }
}

module.exports = CopywritersContractServices






