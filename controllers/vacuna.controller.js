var VacunaService = require('../services/vacuna.service');
var VacunaImgService =require('../services/vacunaImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getVacunas = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Vacunas = await VacunaService.getVacunas({}, page, limit)
        // Return the Vacunas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Vacunas, message: "Succesfully Vacunas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}


exports.createVacuna = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Vacuna = {
        name: req.body.name,
        nombreVacuna: req.body.nombreVacuna,
        dosis: req.body.dosis,
        fecha: req.body.fecha,
        producto: req.body.producto,
        notas: req.body.notas
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdVacuna = await VacunaService.createVacuna(Vacuna)
        return res.status(201).json({createdVacuna, message: "Succesfully Created Vacuna"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Vacuna Creation was Unsuccesfull"})
    }
}

exports.updateVacuna = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Vacuna = {
       
        name: req.body.name ? req.body.name : null,
        nombreVacuna: req.body.nombreVacuna ? req.body.nombreVacuna : null,
        dosis: req.body.dosis ? req.body.dosis : null,
        fecha: req.body.fecha ? req.body.fecha : null,
        producto: req.body.producto ? req.body.producto : null,
        notas: req.body.notas ? req.body.notas : null

    }
    try {
        var updatedVacuna = await VacunaService.updateVacuna(Vacuna)
        return res.status(200).json({status: 200, data: updatedVacuna, message: "Succesfully Updated Vacuna"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeVacuna = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await VacunaService.deleteVacuna(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}