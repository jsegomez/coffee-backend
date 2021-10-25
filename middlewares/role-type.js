const { request, response } = require('express');

const isAdmin = async(req = request, res = response, next) => {
    const user = req.user;

    if(!user){
        return res.status(401).json({
            message: 'Necesita iniciar sesión para continuar...'
        });
    }

    if(user.role != 'ADMIN_ROLE'){
        return res.status(405).json({
            message: 'Petición no permitida...'
        });
    }

    next();
}

module.exports = { isAdmin };