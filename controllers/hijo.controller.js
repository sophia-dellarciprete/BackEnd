var HijoService = require('../services/hijo.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getHijos = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Hijos = await HijoService.getHijos({}, page, limit)
        // Return the Hijos list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Hijos, message: "Succesfully Hijos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}


exports.createHijo = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Hijo = {
        name: req.body.name,
        fecha_nac: req.body.fecha_nac,
        hora_nac: req.body.hora_nac,
        sexo: req.body.sexo,
        peso_nac: req.body.peso_nac,
        circ_cranearea: req.body.circ_cranearea,
        tipo_parto: req.body.tipo_parto,
        grupo_sanguíneo: req.body.grupo_sanguíneo,
        notas: req.body.notas

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHijo = await HijoService.createHijo(Hijo)
        return res.status(201).json({createdHijo, message: "Succesfully Created Hijo"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Hijo Creation was Unsuccesfull"})
    }
}

exports.updateHijo = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Hijo = {
       
        name: req.body.name ? req.body.name : null,
        fecha_nac: req.body.fecha_nac ? req.body.fecha_nac : null,
        hora_nac: req.body.hora_nac ? req.body.hora_nac : null,
        sexo: req.body.sexo ? req.body.sexo : null,
        peso_nac: req.body.peso_nac ? req.body.peso_nac : null,
        circ_cranearea: req.body.circ_cranearea ? req.body.circ_cranearea : null,
        tipo_parto: req.body.tipo_parto ? req.body.tipo_parto : null,
        grupo_sanguíneo: req.body.grupo_sanguíneo ? req.body.grupo_sanguíneo : null,
        notas: req.body.notas ? req.body.notas : null
    }
    try {
        var updatedHijo = await HijoService.updateHijo(Hijo)
        return res.status(200).json({status: 200, data: updatedHijo, message: "Succesfully Updated Hijo"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeHijo = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await HijoService.deleteHijo(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}