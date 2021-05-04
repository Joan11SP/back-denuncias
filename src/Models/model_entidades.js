  
const {Schema, model} = require('mongoose');

const denunciaSchema = new Schema({

    nombre:{type:String,trim:true},
    tipo:{type:String,trim:true}, //   publica ||  privada
    fecha:{type:Date,trim:true,default:Date.now()},
    status:{type:Number,trim:true,default:1} // 1 activo
    
});

var entidad = model('entidades', denunciaSchema);

module.exports = entidad;