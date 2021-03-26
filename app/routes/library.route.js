module.exports = app => {
    const library = require('../controllers/library.controller');

    app.get('/libraries', library.getLibraries);
    app.get('/libraries/:id', library.getOne);
    
    app.post('/libraries', library.create);
};