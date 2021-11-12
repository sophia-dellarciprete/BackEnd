// Gettign the Newly created Mongoose Model we just created 
var Vacuna = require('../models/Vacuna.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Vacuna List
exports.getVacunas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Vacunas = await Vacuna.paginate(query, options)
        // Return the Vacunad list that was retured by the mongoose promise
        return Vacunas;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Vacunas');
    }
}

exports.createVacuna = async function (vacuna) {
    // Creating a new Mongoose Object by using the new keyword
    
    var newVacuna = new Vacuna({
        name: vacuna.name,
        nombreVacuna: vacuna.nombreVacuna,
        dosis: vacuna.dosis,
        fecha: vacuna.fecha,
        producto: vacuna.producto,
        notas: vacuna.notas
    })

    try {
        // Saving the Vacuna 
        var savedVacuna = await newVacuna.save();
        var token = jwt.sign({
            id: savedVacuna._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Vacuna")
    }
}

exports.updateVacuna = async function (vacuna) {
    
    var id = {name :vacuna.name}

    try {
        //Find the old Vacuna Object by the Id
        var oldVacuna = await Vacuna.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Vacuna")
    }
    // If no old Vacuna Object exists return false
    if (!oldVacuna) {
        return false;
    }
    //Edit the Vacuna Object
    oldVacuna.name = vacuna.name
    oldVacuna.nombreVacuna = vacuna.nombreVacuna,
    oldVacuna.dosis = vacuna.dosis,
    oldVacuna.fecha = vacuna.fecha,
    oldVacuna.producto = vacuna.producto,
    oldVacuna.notas = vacuna.notas

    try {
        var savedVacuna = await oldVacuna.save()
        return savedVacuna;
    } catch (e) {
        throw Error("And Error occured while updating the Vacuna");
    }
}

exports.deleteVacuna = async function (id) {

    // Delete the Vacuna
    try {
        var deleted = await Vacuna.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Vacuna Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Vacuna")
    }
}
