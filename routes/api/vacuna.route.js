var express = require('express')
var router = express.Router()
var VacunaController = require('../../controllers/vacuna.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET vacunas listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/vacuna.routes');
  });
router.post('/registration', VacunaController.createVacuna)
router.get('/',Authorization, VacunaController.getVacunas)
router.put('/', Authorization, VacunaController.updateVacuna)
router.delete('/:id', Authorization, VacunaController.removeVacuna)



// Export the Router
module.exports = router;