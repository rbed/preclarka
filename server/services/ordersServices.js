const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");

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
        if(!id){
            throw new Error('Nie ma ID')
        }
        return Orders.findById({_id : id}).then(doc =>{
            return doc
        }).catch(err =>{
            throw err
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
    static async getOrder(id=null){
        if(!id) {
            return await Orders.find().then(doc=>{return doc}).catch(err=>{throw err})
        }
        if(id) {
            return await this.getOrderByID(id)
        }

    }

    /** 
     * @param {object} order
     * @returns created order data
     * @throws Error if order data not recieved || mongoDB othervise or if user object has no enough data
     * x
     */
    static async createOrder(order) {
        if (!order.temat || !order.ileArt) {
            throw new Error("podane zamówienie nie zawiera kompletu informacji")
        }
        const Order = new Orders(order);
        return await Order.save()
        .then(doc => {
            return doc
        })
        .catch(err => {
        throw err
        });
    }


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
        if(!order._id) {
            throw new Error("przekazany objekt order nie ma id")
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
            throw err        
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
    static async removeByID(id) {
        console.log(id);
        if (!id) {
            throw Error("brak id")
        }
        try {
            return await Orders.findOneAndDelete({
                _id: id
              })
        }
        catch(err) {
            throw {"err": err.name, "message" : err.message}  //<<< nie zwraca nic chce usunąć usera podając błędne id
        };
    }
}

module.exports = OrdersServices






