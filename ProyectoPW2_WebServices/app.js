const express = require('express');
const mongoose = require('mongoose');
const NoticiasRoutes = require('./Routes/NoticiasRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'C:/Users/andre/OneDrive/Escritorio/Programación Web II/Morat (Proyecto) - Andrea Castro/uploads')
        /*C:\Users\andre\OneDrive\Escritorio\Programación Web II\Morat (Proyecto) - Andrea Castro\uploads*/
    },
    filename: function (req, file, cb){
        const extension = path.extname(file.originalname);
        if(extension !== '.jpg'){
            return cb(new Error('Only JPG files are allowed'));
        }
        cb(null, file.filename + '-' + Date.now() + extension)
    }
});

const upload = multer({ storage });

mongoose.connect('mongodb://127.0.0.1:27017/ProgramacionWebII', {useNewUrlParser: true})
.then(()=>{
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.log('Error conectandose a MongoDB:', err);
});

const app = express();
app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file){
        res.status(400).send('No file uploaded.');
    } else{
        console.log(req.file.filename);
        res.json({ filename: req.file.filename });
    }
});

NoticiasRoutes(app);
AuthRoutes(app);

app.listen(3001, ()=>{
    console.log('El servidor inicio en el puerto 3001');
});