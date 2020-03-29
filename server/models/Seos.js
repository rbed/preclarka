const mongoose = require('mongoose');

const { Schema } = mongoose;

const SeosSchema = new Schema({
    // czy ja tu potrzebuję definiować jeszcze raz email czy nazwe???
   // name: { type: String, required: true },
   // email: { type: String, required: true, index: true },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      autopopulate: { maxDepth: 2 }
   }
});

SeosSchema.methods.getID = function() {
   return {
      _id: this._id
   };
};

SeosSchema.methods.getEmail = function() {
   return {
      email: this.email
   };
};

SeosSchema.methods.createOrder = function() {
    return {
       // stworzyć
    };
 };

 SeosSchema.methods.acceptOrder = function() {
    return {
       // stworzyć, ale czy akceptacja nie powinna być metoda Order?
    };
 };

SeosSchema.index({ _id: 1, email: 1 }, { unique: true });
// SeosSchema.path('email').required(true, 'email is mandatory');
SeosSchema.plugin(require('mongoose-unique-validator'));
SeosSchema.plugin(require('mongoose-autopopulate'));
mongoose.model('Seos', SeosSchema);
