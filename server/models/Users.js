const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_JWT } = require('../config/config');


const {Schema} = mongoose

const UsersSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {
       type: String, required: true, unique: true, lowercase: true, match:[/\S+@\S+.\S+/, "is invalid"]},
    hash: String,
    salt: String
}) 

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
       .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
       .toString('hex');
 };
 
 UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto
       .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
       .toString('hex');
    return this.hash === hash;
 };
 
 UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 2);
    return jwt.sign(
       { 
          exp: parseInt(expirationDate.getTime() / 1000, 10)
       },
       TOKEN_SECRET_JWT,
       { algorithm: 'HS256' }
    );
 };
 
 UsersSchema.methods.toAuthJSON = function() {
    return {
       token: this.generateJWT()
    };
 };
 
 UsersSchema.methods.showEmail = function() {
    return {
       email: this.email
    };
 };
 
 UsersSchema.statics.findByEmail = function(name) {
    return this.find({ email: name });
 };
 
 UsersSchema.statics.findAll = function() {
    return this.find({});
 };
 
 UsersSchema.plugin(require('mongoose-unique-validator'));
 UsersSchema.plugin(require('mongoose-autopopulate'));

 module.exports = mongoose.model('Users', UsersSchema);

 
