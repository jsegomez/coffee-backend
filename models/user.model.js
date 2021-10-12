const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'Favor indicar nombre']
    },
    lastName: {
        type: String,
        require: [true, 'Favor indicar apellido']
    },
    img: {
        type: String,
        default: 'avg-1.png'
    },
    email: {
        type: String,        
        require: [true, 'Favor un correo electrónico'],
        unique: true,       
    },
    password: {
        type: String,
        require: [true, 'Favor indicar una contraseña']
    },
    state: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: 'USER_ROLE'  
    },
    google: {
        type: Boolean,
        default: true,
    }
});

UserSchema.methods.toJSON = function() {
    const {__v, password, ...user } = this.toObject();    
    return user;
}

module.exports = model('User', UserSchema);