const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, 'Favor proporcionar un rol'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Role', RoleSchema);