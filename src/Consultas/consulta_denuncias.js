const { Types } = require('mongoose');
const denunciasdb = require('../Models/model_denuncia');

const crear_denuncia = async (denuncia) => {
    const nueva = new denunciasdb(denuncia);
    const guardado = await nueva.save();

    if(guardado != null){
        return {mensaje:"Denuncia guardada", ok:1};
    }else{
        return {mensaje:"No se pudo guardar", ok:0};
    }
};
const buscar_denuncias = async (buscard) => {
    try {
        const buscar = await denunciasdb.find({id_persona: Types.ObjectId(buscard.id_persona)});

        if(buscar.length > 0){
            return {mensaje:"Denucias encontradas", ok:1, respuesta:buscar}
        }else{
            return {mensaje:"Denucias no encontradas", ok:0,respuesta:null}
        }
    } catch (error) {
        return {mensaje:"Denucias no encontradas", ok:0}
    }
}
module.exports = {
    crear_denuncia,
    buscar_denuncias
}