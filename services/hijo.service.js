// Gettign the Newly created Mongoose Model we just created 
var Hijo = require('../models/Hijo.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Hijo List
exports.getHijos = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Hijos = await Hijo.paginate(query, options)
        // Return the Hijod list that was retured by the mongoose promise
        return Hijos;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Hijos');
    }
}

exports.createHijo = async function (hijo) {
    // Creating a new Mongoose Object by using the new keyword
    
    var newHijo = new Hijo({
        name: hijo.name,
        fecha_nac: hijo.fecha_nac,
        hora_nac: hijo.hora_nac,
        sexo: hijo.sexo,
        peso_nac: hijo.peso_nac,
        circ_cranearea: hijo.circ_cranearea,
        tipo_parto: hijo.tipo_parto,
        grupo_sanguíneo: hijo.grupo_sanguíneo,
        notas: hijo.notas
    })

    try {
        // Saving the Hijo 
        var savedHijo = await newHijo.save();
        var token = jwt.sign({
            id: savedHijo._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Hijo")
    }
}

exports.updateHijo = async function (hijo) {
    
    var id = {name :hijo.name}

    try {
        //Find the old Hijo Object by the Id
        var oldHijo = await Hijo.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Hijo")
    }
    // If no old Hijo Object exists return false
    if (!oldHijo) {
        return false;
    }
    //Edit the Hijo Object
    var hashedPassword = bcrypt.hashSync(hijo.password, 8);
    oldHijo.name = hijo.name
    oldHijo.fecha_nac = hijo.fecha_nac
    oldHijo.hora_nac = hijo.hora_nac
    oldHijo.sexo = hijo.sexo,
    oldHijo.peso_nac = hijo.peso_nac,
    oldHijo.circ_cranearea = hijo.circ_cranearea,
    oldHijo.tipo_parto = hijo.tipo_parto,
    oldHijo.grupo_sanguíneo = hijo.grupo_sanguíneo,
    oldHijo.notas = hijo.notas

    try {
        var savedHijo = await oldHijo.save()
        return savedHijo;
    } catch (e) {
        throw Error("And Error occured while updating the Hijo");
    }
}

exports.deleteHijo = async function (id) {

    // Delete the Hijo
    try {
        var deleted = await Hijo.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Hijo Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Hijo")
    }
}