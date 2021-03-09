  
const {Schema, model} = require('mongoose');

const loginSchema = new Schema({

    first_name:{type:String,trim:true},
    last_name:{type:String,trim:true},
    email:{type:String,trim:true},
    password:{type:String,trim:true}
    
});

var persona = model('personas', loginSchema);

module.exports = persona;