const Library = require('../models/library.model');

exports.getLibraries = (req, res) => {
    Library.getAll(function(data){
        res.send(data);
    });
};