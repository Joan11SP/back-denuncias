const denunciadb = require('../Consultas/consulta_denuncias');
const cloudinary = require('cloudinary');
const config = require('../Utilities/config');

cloudinary.config({
    cloud_name:'dm8jnpxaf',
    api_key:'351546717888564',
    api_secret:'7ThWaEOgU4U9LfUPzgp7rYGEYHc',
})

const nueva_denuncia = async (req,res) => {
    const imagenes = req.files
    const denuncia = req.body;
    const img_clou = []
    try {
        if(denuncia.id_persona && denuncia.fecha && denuncia.hora && denuncia.latitud && denuncia.longitud){
            if(imagenes.length > 0){
             for (let i = 0; i < imagenes.length; i++) {
                 const result = await cloudinary.v2.uploader.upload(imagenes[i].path);
                 img_clou.push(result.url)
             }
            }
            denuncia.imagenes = img_clou;
            const guardado = await denunciadb.crear_denuncia(denuncia);
            res.json(guardado);
         }else{
             res.json({mensaje:"Faltan datos", ok:0})
         }
    } catch (error) {
        console.log(error)
        res.json({mensaje:"ERROR", ok:0})
    }
};
const denuncias = async (req,res) => {
    const buscar = req.body;
    if(buscar.id_persona != null){
        const busqueda = await denunciadb.buscar_denuncias(buscar);
        res.json(busqueda);
    }else{
        res.json({mensaje:"Faltan datos", ok:0})
    }
}
const all_denuncias = async (req,res) => {
    try {
        const busqueda = await denunciadb.buscar_all_denuncias();
        res.json(busqueda)
    } catch (error) {
        res.json({mensaje:'Ocurrio un error',ok:0})
    }
}

const una_denuncia = async (req,res) => {
    try {
        var buscar = req.body;
        if(buscar.id_denuncia){
            const find = await denunciadb.buscar_una_denuncia(buscar);
            res.json(find)
        }else{
            res.json({mensaje:"Faltan datos", ok:0})
        }
    } catch (error) {
        res.json({mensaje:'Ocurrio un error',ok:0})
    }
}

const nuevo_reporte = async (req,res,next) => {
    try {
        var crear = req.body;
        if(!crear.id_admin || !crear.id_denuncia || !crear.id_entidad){
            req.body = {mensaje: config.FALTA_INFORMACION, ok: config.ERROR}
        }
        else
            req.body = await denunciadb.crear_reporte(crear);
        next();
    } catch (error) {
        req.body =  {mensaje: config.ERROR_CATCH, ok: config.ERROR}
        next();
    }
}

const get_entidades = async (req,res,next) => {
    try {
        req.body = await denunciadb.obtener_entidades();
        next();
    } catch (error) {
        req.body =  {mensaje: config.ERROR_CATCH, ok: config.ERROR}
        next();
    }
}
module.exports = {
    nueva_denuncia,
    denuncias,
    all_denuncias,
    una_denuncia,
    nuevo_reporte,
    get_entidades
}