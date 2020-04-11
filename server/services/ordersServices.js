const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class OrdersServices{
    /**
     * 
     * @param {ObjectID} ObjectID of Order
     * @throws Error - Nie ma ID  || MongoDB Error!
     * @returns List of Orders as per id
     * @async
     * x
     */
    static getOrderByID(id){
        return Orders.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw Error('brak id - blad ze zwyklej klasy error')
        })
    }

    /**
     * 
     * @param {String} id 
     * @throws lack of parameter || MongoDB Err
     * @returns Order depends on the given parameter
     * @async
     * x
     */
    static async getOrders(id=null){
        if(!id) {
            return await Orders.find().then(doc=>{return doc}).catch(err=>{throw new AppError('coś nie tak z baza danych', MONGO_ERROR, err)})
        }
        if(id) {
            try {
               return await this.getOrderByID(id)
            }
            catch(err) {
                throw new AppError('ID niepoprawne', MONGO_ERROR)
            }
        }

    }

    /** 
     * @param {object} order
     * @returns created order data
     * @throws Error if order data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async create(order) {
        if (!order) {
            throw new AppError('brak zamowienia', ARGUMENT_ERROR)
        }
        const Order = new Orders(order);
        return await Order.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
            throw new AppError('blad mongodb', MONGO_ERROR, err)
        });
    }

    // TODO: updatuje order ze złym id
    /**
     * 
     * @param {Object} order 
     * @throws Error if id of the order you want to update not exist or if Provided user object has no id
     * @returns updated order
     * @async
     * 
     */
    static async update(order) {     
        console.log(order);
        if(!order) {
            throw new AppError('brak zamowienia do aktualizacji', ARGUMENT_ERROR)
        }
        try{
        const doc = await Orders.findOneAndUpdate(
            { _id: order._id },
            order, {new: true}); 
            return {
                order: doc,
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
     * @throes Error if lack of id or there is no order with the provided id 
     * @returns deleted order
     * @async
     * 
     */
    static async delete(id) {
        console.log(id);
        if (!id) {
            throw new AppError('brak id - arg err', ARGUMENT_ERROR)
        }
        try {
            return await Orders.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw new AppError('id nie znalezione - mongo err', MONGO_ERROR, err)
        };
    }
}

module.exports = OrdersServices






