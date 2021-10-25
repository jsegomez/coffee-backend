const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, 'Favor proporcionar un rol'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

RoleSchema.methods.toJSON = function() {
    const { __v, _id, ...role } = this.toObject();
    role.id = _id;
    return role;
}

module.exports = model('Role', RoleSchema);