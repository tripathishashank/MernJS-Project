var mongoose = require("mongoose");
const crypto = require('crypto');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
  
  uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 
  uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 

  var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    // TODO: Come back here

    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
  }, {timestamps: true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    });

userSchema.methods = {

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
            
        } catch (error) {
            return "";
            
        }
    }
};


module.exports = mongoose.model("User", userSchema);