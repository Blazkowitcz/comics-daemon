const database = require('../modules/database').db;
/**
 * Constructor
 * @param {*} id 
 * @param {*} title 
 */
function Library(id, title) {
    this.id = id;
    this.title = title;
}

Library.getAll = function getAll(callback) {
    database.query("SELECT * FROM libraries", function (err, res){
        callback(res);
    });
};

Library.getOne = function getOne(id, callback) {
    database.query("SELECT * FROM libraries WHERE id = " + id, function (err, res){
        callback(res);
    });
};

Library.create = function create(title, callback) {
    database.query("INSERT INTO libraries (title) VALUES ('" + title + "')", function(err){
        if(!err){
            callback(true);
        }else{
            callback(err);
        }
    });
};

module.exports = Library;