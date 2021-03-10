const {crear_persona,login_persona,crear_loguear_facebook} = require('../Controllers/controller_persona');
const {nueva_denuncia,denuncias,all_denuncias} = require('../Controllers/controller_denuncias');
const {Router} = require('express');
const upload = require('../Utilities/utilities_multer');
const router = Router();

// RUTAS DE PERSONA
router.post('/crear-persona', crear_persona);
router.post('/login-persona', login_persona);

//RUTAS DE DENUNCIAS
router.post('/crear-denuncia', upload, nueva_denuncia);
router.post('/filtrar-denuncias',denuncias);
router.post('/filtrar-all-denuncias',all_denuncias);
router.post('/crear-login-facebook',crear_loguear_facebook);

module.exports = router 