const auth = require('../Util/Auth');

module.exports = (app) => {
    app.post('/signup', auth.signUp);
    app.post('/login', auth.login);
}