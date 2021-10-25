const User = require('../models/user.model');

const existUserById = async(id) => {
    const user = await User.findById(id);

    if(!user){
        throw new Error(`Usuario con id: ${id} no existe`);
    }
}

const isUniqueEmail = async(email = '') => {
    const user = await User.findOne({email});

    if(user){
        throw new Error(`Correo electrónico ya se encuentra registrado`);
    }
}

module.exports = { existUserById, isUniqueEmail }