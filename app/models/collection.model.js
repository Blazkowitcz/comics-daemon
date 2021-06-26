const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

/**
 * Collection Database Schema
 */
const Collection = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    library_id: {
        type: Number,
        required: true
    },
    logo_url: {
        type: String,
        required: false
    }
})

Collection.plugin(autoIncrement, {id: 'collection', inc_field: 'id'});
module.exports = mongoose.model("collections", Collection);