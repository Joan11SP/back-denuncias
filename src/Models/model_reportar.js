  
const {Schema, model,Types} = require('mongoose');

const denunciaSchema = new Schema({

    id_admin:{type:Types.ObjectId,trim:true,require:true},
    fecha:{type:Date,trim:true,default:Date.now()},
    observacion:{type:String,trim:true},
    id_entidad:{type:Types.ObjectId,trim:true},
    id_denuncia:{type:Types.ObjectId,trim:true},
    prioridad:{type:Number,trim:true},
    status:{type:Number,trim:true,default:1} // 1 activo
});

var reportar = model('reportar', denunciaSchema);

module.exports = reportar;