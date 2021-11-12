var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var HijoSchema = new mongoose.Schema({
    name: String,
    fecha_nac: Date,
    hora_nac: String,
    sexo: String,
    peso_nac: Number,
    circ_cranearea: Number,
    tipo_parto: String,
    grupo_sanguíneo: String,
    notas: String
})

HijoSchema.plugin(mongoosePaginate)
const Hijo = mongoose.model('Hijo', HijoSchema)

module.exports = Hijo;