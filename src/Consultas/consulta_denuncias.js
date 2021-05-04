const { Types } = require('mongoose');
const denunciasdb = require('../Models/model_denuncia');
const reportardb = require('../Models/model_reportar');
const entidadb = require('../Models/model_entidades');
const config = require('../Utilities/config');

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

//reporta una denuncia a una entidad
const crear_reporte = async (buscar) => {
    try {
        const find = await reportardb.findOne({id_denuncia:Types.ObjectId(buscar.id_denuncia)});

        if(find != null) return {mensaje: config.DENUNCIA_EXISTE, ok: config.ERROR}

        const nuevo = await new reportardb(buscar);
        nuevo = await nuevo.save();

        if(nuevo == null) return {mensaje: config.ERROR_GUARDAR, ok: config.ERROR}

        return {mensaje: config.TODO_CORRECTO, ok: config.SUCCESS}
    } catch (error) {
        throw error;
    }
}

const obtener_entidades = async () => {
    try {
        const find = await entidadb.find();
        return {mensaje: config.TODO_CORRECTO, ok: config.SUCCESS,respuesta:find}
    } catch (error) {
        throw error;
    }
}
module.exports = {
    crear_denuncia,
    buscar_denuncias,
    buscar_all_denuncias,
    buscar_una_denuncia,
    crear_reporte ,
    obtener_entidades
}