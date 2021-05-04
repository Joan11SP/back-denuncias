const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
require('./Database/mongodb');
const router = require('./Routes/routes'); 
const cors = require("cors");
const config_variables = require('./Config/config_variables');
const {enviar_datos} = require('./Utilities/middleware')

const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api-denuncias',router);
app.use(enviar_datos)
var port = process.env.PORT || config_variables.port_app


app.listen(port,()=>{
    console.log('listening on port ',port);
});
