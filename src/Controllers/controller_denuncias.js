const denunciadb = require('../Consultas/consulta_denuncias');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name:'dm8jnpxaf',
    api_key:'351546717888564',
    api_secret:'7ThWaEOgU4U9LfUPzgp7rYGEYHc',
})

const nueva_denuncia = async (req,res) => {
    console.log(req.files);
    const imagenes = req.files
    const denuncia = req.body;
    const img_clou = []
    console.log(req.body);
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
module.exports = {
    nueva_denuncia,
    denuncias
}