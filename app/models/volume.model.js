const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

/**
 * Volume Database Schema
 */
const Volume = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    collection_id: {
        type: Number,
        required: true
    },
})

Volume.plugin(autoIncrement, {id: 'volume', inc_field: 'id'});
module.exports = mongoose.model("volumes", Volume);