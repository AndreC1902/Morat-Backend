const Noticias = require('../Models/Noticias');
const fs = require('fs');

exports.getNoticias = async (req, res) => {
    try{
        const contenido = await Noticias.find();
        res.send(contenido);
    }catch(err){
        console.error('Hubo un error: ', err);
        res.status(500).send('Error en Servidor');
    }
}

exports.getPaginateNoticias = async (req, res) => {
    try{
        const limit = parseInt(req.query.limit, 10) || 10;
        const page = parseInt(req.query.page, 10) || 1;
        const Noticia = await Noticias.paginate({}, {limit, page});
        res.json(Noticia);
    }catch(err){
        console.error('getPaginateNoticias: Hubo un error: ', err);
        res.status(500).send('Error en Servidor');
    }
}

exports.consultNoticias = async (req, res) => {
    try{
        const { id } = req.params;
        const consultNoticias = await Noticias.findById(id);
        if(consultNoticias){
            res.status(200).send(consultNoticias);
        } else {
            res.status(404).send(`No se encontró una Noticia con Id: id`);
        }
    }catch(err){
        console.error('consultNoticias: Hubo un error: ', err);
        res.status(500).send('Error en Servidor');
    }
}

exports.createNoticias = async (req, res) => {
    try{
            const newNoticias = new Noticias({
                Titulo: req.body.titulo,
                FechaPublicacion: req.body.fechaP,
                Contenido: req.body.contenido,
                Autor: req.body.autor,
                Categoria: req.body.categoria,
                Etiquetas: req.body.etiquetas
            });
            const savedNoticias = await newNoticias.save();
            res.status(200).send(savedNoticias);
    }catch(err){
        console.error('createNoticias: Hubo un error: ', err);
        res.status(500).send('Error en Servidor');
    }
}

exports.updateNoticias = async (req, res) => {
    try{
        const { id } = req.params;
        const updateNoticias = ({
            Titulo: req.body.titulo,
            FechaPublicacion: req.body.fechaP,
            Contenido: req.body.contenido,
            Autor: req.body.autor,
            Categoria: req.body.categoria,
            Etiquetas: req.body.etiquetas
        });
        const updatedNoticias = await Noticias.findByIdAndUpdate(
            id,
            updateNoticias
        );
        if(updatedNoticias){
            res.status(200).send(updatedNoticias);
        } else {
            res.status(404).send(`No se encontró una Noticia con Id: id`);
        }
    }catch(err){
        console.error('updateNoticias: Hubo un error: ', err);
        res.status(500).send('Error en Servidor');
    }
}

exports.deleteNoticias = async (req, res) => {
    try{
        const { id } = req.params;        
        const Noticia = await Noticias.findById(id); 
        
        if(!Noticia){
            return res.status(404).send('No se encontró una Noticia con Id: id');
        }

        if(Noticia.Ruta){
            fs.unlinkSync(Noticia.Ruta);
        }

        const deletedNoticias = await Noticias.findByIdAndDelete(id);
        if(deletedNoticias){
            res.status(200).send(deletedNoticias);
        } else {
            res.status(404).send(`No se encontró una Noticia con Id: ${id}`);
        }
    }catch(err){
        console.error('deleteNoticias: Hubo un error: ', err);
        res.status(500).send('Error en Servidor');
    }
}