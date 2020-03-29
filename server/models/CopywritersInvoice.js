const mongoose = require('mongoose');

const { Schema } = mongoose;

const CopywritersInvoice = new Schema({
    nazwaFirmy: {type: String, required: true},
    regon: {type: String, required: true, lowercase: true},
    nip: {type: String, required: true},
    kwota1000: {type: Number, required: true},
    stanKonta:  {type: Number, required: true, default: 0, min: 0},
    adres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addresses',
        autopopulate: { maxDepth: 2 }
    },
    adresKoresp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addresses',
        autopopulate: { maxDepth: 2 }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        autopopulate: { maxDepth: 2 }
    }
});



CopywritersInvoice.methods.getEmail = function() {
   return {
      email: this.email
   };
};

CopywritersInvoice.methods.createOrder = function() {
    return {
       // stworzyć
    };
 };

 CopywritersInvoice.methods.acceptOrder = function() {
    return {
       // stworzyć, ale czy akceptacja nie powinna być metoda Order?
    };
 };

CopywritersInvoice.index({ _id: 1, email: 1 }, { unique: true });
// CopywritersInvoice.path('email').required(true, 'email is mandatory');
CopywritersInvoice.plugin(require('mongoose-unique-validator'));
CopywritersInvoice.plugin(require('mongoose-autopopulate'));
mongoose.model('CopywritersInvoice', CopywritersInvoice);
