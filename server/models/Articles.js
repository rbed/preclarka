const mongoose = require('mongoose');

const { Schema } = mongoose;

const Articles = new Schema({
   tytul: {type: String, required: true, lowercase: true},
   tresc: {type: String, required: true, lowercase: true},
//    ile znaków max może przyjąć string?
//    zawsze lepiej obciązyć pamięć niż procesor
   minDlugosc: {type: Number},
   rzeczDlugosc: {type: Number},
   zamowienie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Orders',
      autopopulate: { maxDepth: 2 }
  },

});




// Artykul.index({ _id: 1, email: 1 }, { unique: true });
// Artykul.path('email').required(true, 'email is mandatory');
// Artykul.plugin(require('mongoose-unique-validator'));
Articles.plugin(require('mongoose-autopopulate'));
mongoose.model('Articles', Articles);
