const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

/**
 * Volume Database Schema
 */
const Read = mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    volume_id: {
        type: Number,
        required: true
    },
})

Read.plugin(autoIncrement, {id: 'read', inc_field: 'id'});
module.exports = mongoose.model("read", Read);