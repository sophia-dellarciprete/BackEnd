var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ConsultaSchema = new mongoose.Schema({
    name: String,
    tipo_consulta: String,
    fecha: Date,
    peso: Number,
    altura: Number,
    circ_cranearea: Number,
    notas: String
})

ConsultaSchema.plugin(mongoosePaginate)
const Consulta = mongoose.model('Consulta', ConsultaSchema)

module.exports = Consulta;