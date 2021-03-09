  
const mongoose = require('mongoose');
const config_variables = require('../Config/config_variables');

var opciones = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect('mongodb+srv://Bruja:1925BscJp@cluster0-hp4pe.mongodb.net/Denuncias?retryWrites=true&w=majority',opciones)
    .then(db => console.log('conected to Mongo'))
    .catch(err => console.error(err)); 
let port = config_variables.port_db;
let db = config_variables.nombre_db;
let host = config_variables.hostname
/*mongoose.connect(`mongodb://${host}:${port}/${db}`, opciones)
    .then(db => console.log('conected to Mongodb'))
    .catch(err => console.error(err));;*/

module.exports = mongoose