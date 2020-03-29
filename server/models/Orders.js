const mongoose = require('mongoose');

const { Schema } = mongoose;

const Orders = new Schema({
   temat: {type: String, required: true, lowercase: true},
   ileArt: {type: Number, required: true, lowercase: true},
//    ile znaków max może przyjąć string?
//    zawsze lepiej obciązyć pamięć niż procesor
   dlugoscArt: {type: Number},
   wartosc: {type: Number},
   komentarzOdrzucenia: {type: String},
});




// Zamowienie.index({ _id: 1, email: 1 }, { unique: true });
// Zamowienie.path('email').required(true, 'email is mandatory');
// Zamowienie.plugin(require('mongoose-unique-validator'));
Orders.plugin(require('mongoose-autopopulate'));
mongoose.model('Orders', Orders);
