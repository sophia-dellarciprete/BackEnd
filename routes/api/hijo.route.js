var express = require('express')
var router = express.Router()
var HijoController = require('../../controllers/hijo.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET hijos listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/hijo.routes');
  });
router.post('/registration', HijoController.createHijo)
router.get('/',Authorization, HijoController.getHijos)
router.put('/', Authorization, HijoController.updateHijo)
router.delete('/:id', Authorization, HijoController.removeHijo)



// Export the Router
module.exports = router;



//api/hijos
//api/hijos/registration
//api/hijos/login