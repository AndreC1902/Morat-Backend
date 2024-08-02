const NoticiasController = require('../Controllers/NoticiasController');
const Auth = require('../Util/Auth');

module.exports = (app) => {
    app.get('/Noticias', NoticiasController.getNoticias);
    app.get('/NoticiasPag', NoticiasController.getPaginateNoticias);
    app.get('/Noticias/:id', NoticiasController.consultNoticias);
    app.post('/Noticias', Auth.authenticate, NoticiasController.createNoticias);
    app.put('/Noticias/:id', Auth.authenticate, NoticiasController.updateNoticias);
    app.delete('/Noticias/:id', Auth.authenticate, NoticiasController.deleteNoticias);
}