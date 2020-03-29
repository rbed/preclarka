const mongoose = require('mongoose');

const { Schema } = mongoose;

const Contracts = new Schema({
   numer: {type: String, required: true, lowercase: true},
   path: {type: String, required: true, lowercase: true},
   uploadDate: {type: Date, default: Date.now},
   fileName: {type: String, required: true, lowercase: true},
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Users',
       autopopulate: { maxDepth: 2 }
   }
});




// Umowa.index({ _id: 1, email: 1 }, { unique: true });
// Umowa.path('email').required(true, 'email is mandatory');
// Umowa.plugin(require('mongoose-unique-validator'));
Contracts.plugin(require('mongoose-autopopulate'));
mongoose.model('Contracts', Contracts);

