const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

/**
 * Library Database Schema
 */
const Library = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    logo_url: {
        type: String,
        required: false
    }
})

Library.plugin(autoIncrement, {id: 'library', inc_field: 'id'});
module.exports = mongoose.model("libraries", Library);