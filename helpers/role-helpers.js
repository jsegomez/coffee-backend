const Role = require('../models/role.model');

const verifyRole = async(role = '') => {
    const verify = await Role.findOne({role});
    
    if(!verify){
        throw new Error(`Rol proporcionado no existe`);
    }
}

module.exports = { verifyRole }