const mongoose = require('mongoose');

const boards = mongoose.model('Board', {
    name: String,
    tasks: Array,
    members: Array,
    user: String,
});

module.exports = { boards };
