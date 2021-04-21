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
const buscar_all_denuncias = async () => {
    try {
        const buscar = await denunciasdb.find({});

        if(buscar.length > 0){
            return {mensaje:"Denucias encontradas", ok:1, respuesta:buscar}
        }else{
            return {mensaje:"Denucias no encontradas", ok:0,respuesta:null}
        }
    } catch (error) {
        return {mensaje:"Denucias no encontradas", ok:0}
    }
}
const buscar_una_denuncia = async (buscar) => {
    try {
        
        const find = await denunciasdb.findOne({_id:Types.ObjectId(buscar.id_denuncia)});
        return { mensaje: 'Realiazo correctamente', ok: 1, respuesta:find};

    } catch (error) {
        throw error;
    }
}
module.exports = {
    crear_denuncia,
    buscar_denuncias,
    buscar_all_denuncias,
    buscar_una_denuncia
}