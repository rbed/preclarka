const mongoose = require('mongoose');

const { Schema } = mongoose;

const CopywritersContract = new Schema({
    dataUrodzenia: {type: Date, required: true},
    imieMatki: {type: String, required: true, lowercase: true},
    imieOjca: {type: String, required: true, lowercase: true},
    nrDowodu: {type: String, required: true, lowercase: true},
    pesel: {type: String, required: true},
    nip: {type: String, required: true},
    kwota1000: {type: Number, required: true, default:0},
    stanKonta:  {type: Number, required: true, default: 0, min: 0},
    adres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addresses',
        autopopulate: { maxDepth: 2 }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        autopopulate: { maxDepth: 2 }
    },
    adresKoresp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addresses',
        autopopulate: { maxDepth: 2 }
    }
});



CopywritersContract.methods.getEmail = function() {
   return {
      email: this.email
   };
};

CopywritersContract.methods.createOrder = function() {
    return {
       // stworzyć
    };
 };

 CopywritersContract.methods.acceptOrder = function() {
    return {
       // stworzyć, ale czy akceptacja nie powinna być metoda Order?
    };
 };

CopywritersContract.index({ _id: 1, email: 1 }, { unique: true });
// CopywritersContract.path('email').required(true, 'email is mandatory');
CopywritersContract.plugin(require('mongoose-unique-validator'));
CopywritersContract.plugin(require('mongoose-autopopulate'));
mongoose.model('CopywritersContract', CopywritersContract);
