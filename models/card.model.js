const mongoose 	= require('mongoose');
const CONFIG    = require('../config/config');

let CardSchema = new mongoose.Schema({
   
    bankName: {
        type: String
    },
    CardHolder: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    cardNumber:{
        type: Number
    },
    cvv: {
        type: Number
    },
    expMonth: {
        type: Number
    },
    expYear: {
        type: Number
    }
})
 

CardSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};


let Card = module.exports = mongoose.model('Card', CardSchema);


