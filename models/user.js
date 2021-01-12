const mongoose = require('mongoose');
const crypto = require('crypto');

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true,          // Any space in beginning and end will be trim down
        maxlength: 32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    hashed_password:{
        type: String,
        required: true
    },
    about: {
        type:String,
        trim: true,
    },
    role:{ 
        type:Number,
        default:0
    },
    history: {
        type :Array,
        default: []
    }

},
{timestamps:true}
);

module.exports = mongoose.model('User',user_schema);
