const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

/**
 * User Database Schema
 */
const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    volume_read: {
        type: Number,
        required: false
    },
    page: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

User.plugin(autoIncrement, {id: 'user', inc_field: 'id'});
module.exports = mongoose.model("user", User);

