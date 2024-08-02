const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
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

module.exports = upload;