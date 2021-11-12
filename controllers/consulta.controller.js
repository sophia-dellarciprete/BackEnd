var ConsultaService = require('../services/consulta.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getConsultas = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Consultas = await ConsultaService.getConsultas({}, page, limit)
        // Return the Consultas list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Consultas, message: "Succesfully Consultas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createConsulta = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Consulta = {
        name: req.body.name,
        tipo_consulta: req.body.tipo_consulta,
        fecha: req.body.fecha,
        peso: req.body.peso,
        altura: req.body.altura,
        circ_cranearea: req.body.circ_cranearea,
        notas: req.body.notas

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdConsulta = await ConsultaService.createConsulta(Consulta)
        return res.status(201).json({createdConsulta, message: "Succesfully Created Consulta"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Consulta Creation was Unsuccesfull"})
    }
}

exports.updateConsulta = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Consulta = {
       
        name: req.body.name ? req.body.name : null,
        tipo_consulta: req.body.tipo_consulta ? req.body.tipo_consulta : null,
        fecha: req.body.fecha ? req.body.fecha : null,
        peso: req.body.peso ? req.body.peso : null,
        altura: req.body.altura ? req.body.altura : null,
        circ_cranearea: req.body.circ_cranearea ? req.body.circ_cranearea : null,
        notas: req.body.notas ? req.body.notas : null

    }
    try {
        var updatedConsulta = await ConsultaService.updateConsulta(Consulta)
        return res.status(200).json({status: 200, data: updatedConsulta, message: "Succesfully Updated Consulta"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeConsulta = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await ConsultaService.deleteConsulta(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}





    