const personadb = require('../Models/model_persona');
const { validar_correo, nueva_persona } = require('../Consultas/consulta_persona');
const { comparePassword,encrytp } = require('../Utilities/utilities_encriptar_password');


const login_persona = async (req, res) => {
    const persona = req.body;
    if (persona.email != null && persona.password != null) {
        const validado = await validar_correo(persona);
        if (validado.ok == 1 && validado.persona != null) {
            let contrasenia = await comparePassword(persona.password, validado.persona.password);
            if (contrasenia) {
                res.json({ mensaje: "Ingreso correctamente", ok: 1, identificador: validado.persona._id })
            } else {
                res.json({ mensaje: "Datos incorrectos", ok: 0, })
            }
        } else {
            res.json({ mensaje: "Datos incorrectos", ok: 0, })
        }
        res.json(validado);
    } else {
        res.json({ mensaje: "Faltan datos", ok: 0 })
    }
}
const crear_persona = async (req, res) => {
    const persona = req.body;
    if (persona.email && persona.password  && persona.first_name ) {
        const existe_correo = await validar_correo(persona);
        console.log(existe_correo)
        if (existe_correo.ok == 0) {
            persona.password = await encrytp(persona.password);
            const nuevo_perfil = await nueva_persona(persona);
            if (nuevo_perfil.ok == 1) {
                res.json({ mensaje: nuevo_perfil.mensaje, identificador: nuevo_perfil._id, ok: nuevo_perfil.ok })
            } else {
                res.json({ mensaje: nuevo_perfil.mensaje, ok: nuevo_perfil.ok })
            }
        }else{
            res.json({ mensaje: 'El correo ya esta en uso', ok: 0 })
        }
    } else {
        res.json({ mensaje: "Faltan datos", ok: 0 })
    }
}

const crear_loguear_facebook = async (req,res) => {
    try {
        
        const facebook = req.body;

        if(facebook.email && facebook.first_name && facebook.last_name){
            const existe = await validar_correo(facebook);
            if(existe.ok == 1){
                res.json({ mensaje: 'Ingreso correctamete', identificador: existe.persona._id, ok: 1 })
            }else{
                const crear = await nueva_persona(facebook);
                res.json({mensaje:crear.mensaje, ok:crear.ok, identificador: crear._id});
            }
        }else{
            res.json({mensaje:"No se puede completar", ok: 0});
        }

    } catch (error) {
        res.json({mensaje:"Ocurrio un error, vuelve a intentarlo", ok: 0});
    }
} 


module.exports = {
    login_persona,
    crear_persona,
    crear_loguear_facebook
}