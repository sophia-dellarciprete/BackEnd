var express = require('express')
var router = express.Router()
var ConsultaController = require('../../controllers/consulta.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET consultas listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/consulta.routes');
  });
router.post('/registration', ConsultaController.createConsulta)
router.get('/',Authorization, ConsultaController.getConsultas)
router.put('/', Authorization, ConsultaController.updateConsulta)
router.delete('/:id', Authorization, ConsultaController.removeConsulta)



// Export the Router
module.exports = router;