const mongoose = require('mongoose');

const { Schema } = mongoose;

const Invoices = new Schema({
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




// Invoice.index({ _id: 1, email: 1 }, { unique: true });
// Invoice.path('email').required(true, 'email is mandatory');
// Invoice.plugin(require('mongoose-unique-validator'));
Invoices.plugin(require('mongoose-autopopulate'));
mongoose.model('Invoices', Invoices);


