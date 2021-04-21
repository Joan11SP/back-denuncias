  
const {Schema, model,Types} = require('mongoose');

const denunciaSchema = new Schema({

    descripcion:{type:String,trim:true},
    fecha:{type:String,trim:true},
    hora:{type:String,trim:true},
    referencia:{type:String,trim:true},
    calles:{type:String,trim:true},
    latitud:{type:Number,trim:true},
    longitud:{type:Number,trim:true},
    id_persona:{type:Types.ObjectId,trim:true},
    imagenes:{type:Array,trim:true},
    status:{type:Number,trim:true,default:1} // 1 activo
    
});

var persona = model('denuncias', denunciaSchema);

module.exports = persona;