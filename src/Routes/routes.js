const {crear_persona,login_persona,crear_loguear_facebook} = require('../Controllers/controller_persona');
const control_denuncia = require('../Controllers/controller_denuncias');
const {Router} = require('express');
const upload = require('../Utilities/utilities_multer');
const router = Router();

// RUTAS DE PERSONA
router.post('/crear-persona', crear_persona);
router.post('/login-persona', login_persona);
router.post('/crear-login-facebook',crear_loguear_facebook);

// RUTAS DE DENUNCIAS
router.post('/crear-denuncia', upload, control_denuncia.nueva_denuncia);
router.post('/filtrar-denuncias',control_denuncia.denuncias);
router.post('/filtrar-all-denuncias',control_denuncia.all_denuncias);
router.post('/buscar-una-denuncia',control_denuncia.una_denuncia);


// RUTAS ENTIDAD
router.post('/obtener-all-entidades',control_denuncia.get_entidades);

// RUTAS REPORTAR
router.post('/admin-reportar-denuncia',control_denuncia.nuevo_reporte);
module.exports = router 