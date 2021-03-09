const personadb = require('../Models/model_persona');

const validar_correo = async (persona) => {
    const validar =  await personadb.findOne({ email: persona.email}, { _id:1, password:1 });

    if(validar != null){
        return {mensaje:'Encontrado', ok:1, persona:validar}
    }else{
        return {mensaje:'No encontrado', ok:0, persona:null}
    }
}

const nueva_persona = async (persona) => {
    const nuevo = await new personadb(persona);
    const guardado = await nuevo.save();

    if(guardado != null){
        return {mensaje:"Regístrado correctamente", ok:1, _id:guardado._id};
    }else{
        return {mensaje:"No se pudo guardar", ok:0};
    }
}

module.exports = {
    validar_correo,
    nueva_persona
}