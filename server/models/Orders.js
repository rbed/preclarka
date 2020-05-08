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
   created: {type: Date, default: Date.now},
   status: {type: String, required: true, default: 'zlozone'}
});

// Zamówienia mogę mieć statusy
// zlozone - kiedy soewiec zglosil zapotrzebowanie
// wtrakcie - kiedy admin przypisal copywritera ale ten jeszcze nie przyjal zlecenie (lub kiedy je odrzucil)
//  przyjete - kiedy copywriter przyjal zlecenie
// wykonane - kiedy copywriter zrobil i wyslal
// odrzucone - kiedy admin lub seowiec odrzucili teksty
//  


// Zamowienie.index({ _id: 1, email: 1 }, { unique: true });
// Zamowienie.path('email').required(true, 'email is mandatory');
// Zamowienie.plugin(require('mongoose-unique-validator'));
Orders.plugin(require('mongoose-autopopulate'));
mongoose.model('Orders', Orders);
