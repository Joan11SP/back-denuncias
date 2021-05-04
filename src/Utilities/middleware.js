
const enviar_datos = async (req,res) => {
    try {
        res.json(req.body);
    } catch (error) {
        res.json({mensaje:''})
    }
} 

module.exports = {
    enviar_datos
}