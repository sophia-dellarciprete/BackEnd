// Gettign the Newly created Mongoose Model we just created 
var Consulta = require('../models/Consulta.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getConsulta = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Consultas = await Consultas.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Consultas;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Consultas');
    }
}

exports.createConsulta = async function (Consulta) {
    
    
    var newConsulta = new Consulta({
        name: consulta.name,
        tipo_consulta: consulta.tipo_consulta,
        fecha: new Date (),
        peso: consulta.peso,
        altura: consulta.altura,
        circ_cranearea: consulta.circ_cranearea,
        notas: consulta.notas
        
    })

    try {
        // Saving the User 
        var savedConsulta = await newConsulta.save();
        var token = jwt.sign({
            id: savedConsulta._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Consulta")
    }
}

exports.updateUser = async function (user) {
    
    var id = {name :user.name}

    try {
        //Find the old User Object by the Id
        var oldConsulta = await Consulta.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Consulta")
    }
    // If no old User Object exists return false
    if (!oldConsulta) {
        return false;
    }
    //Edit the User Object
    
    oldConsulta.tipo_consulta= consulta.tipo_consulta
    oldConsulta.fecha= new Date ()
    oldConsulta.peso= consulta.peso
    oldConsulta.altura= consulta.altura
    oldConsulta.circ_cranearea= consulta.circ_cranearea
    oldConsulta.notas= consulta.notas
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the Consulta");
    }
}

exports.deleteConsulta = async function (id) {

    // Delete the Consulta
    try {
        var deleted = await Consulta.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Consulta Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Consulta")
    }
}
