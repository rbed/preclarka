const mongoose = require('mongoose');

const { Schema } = mongoose;

const Addresses = new Schema({
   ulica: {type: String, required: true, lowercase: true},
   nrDomu: {type: String, required: true, lowercase: true},
   nrLokalu: {type: String, lowercase: true}, 
   miasto: {type: String, required: true, lowercase: true}, 
   kodPocz: {type: String, required: true},
   kraj: {type: String, required: true, default: "Poland", lowercase: true}
});


Addresses.pre('save', () => console.log('Hello from pre save'));

// Adres.index({ _id: 1, email: 1 }, { unique: true });
// Adres.path('email').required(true, 'email is mandatory');
// Adres.plugin(require('mongoose-unique-validator'));
Addresses.plugin(require('mongoose-autopopulate'));
mongoose.model('Addresses', Addresses);

