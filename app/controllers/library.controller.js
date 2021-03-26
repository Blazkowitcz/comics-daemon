const Library = require('../models/library.model');

exports.getLibraries = (req, res) => {
    Library.getAll(function(data){
        res.send(data);
    });
};

exports.getOne = (req, res) => {
    Library.getOne(req.params.id, function(data){
        res.send(data);
    });
};

exports.create = (req, res) => {
    Library.create(req.body.title, function(response){
        res.send(response);
    });
};