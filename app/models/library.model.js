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
    callback([{'id': 1, 'title': 'Comics'}, {'id': 2, 'title': 'Manga'}]);
};

module.exports = Library;