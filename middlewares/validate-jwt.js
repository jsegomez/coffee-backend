const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            message: 'Necesita iniciar sesión para continuar...'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        
        if(!user){
            return req.status(401).json({
                message: 'Usuario no existe en base de datos'
            });
        }

        if(user.status == false){
            return req.status(401).json({
                message: 'Usuario con estado inactivo'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Token no valido'
        });
    }
}

module.exports = validateJWT;

