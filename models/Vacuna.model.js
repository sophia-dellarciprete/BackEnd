var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var VacunaSchema = new mongoose.Schema({
    name: String,
    nombreVacuna: String,
    dosis: String,
    fecha: Date,
    producto: String,
    notas: String
})

VacunaSchema.plugin(mongoosePaginate)
const Vacuna = mongoose.model('Vacuna', VacunaSchema)

module.exports = Vacuna;