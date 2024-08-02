const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new mongoose.Schema({
    Titulo: { type: String },
    FechaPublicacion: { type: Date },
    Contenido: { type: String },
    Autor: { type: String },
    Categoria: { type: String },
    Etiquetas: { type: String },
    Fileimg: String,
    Ruta: String
});

schema.plugin(mongoosePaginate);
const Noticias = mongoose.model('Noticias', schema);

module.exports = Noticias;