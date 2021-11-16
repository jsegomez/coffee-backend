const { request, response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const generateJWT = require('../helpers/jwt');

const login = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message: 'Usuario y/o contraseña incorrectos'
            });
        }

        if(user.status == false){
            return res.status(401).json({
                message: 'Cuenta se encuentra desactivada'
            });
        }

        const passwordValid = bcrypt.compareSync(password, user.password);
        
        if(!passwordValid){
            return res.status(401).json(
                {message: 'Usuario y/o contraseña incorrectos'}
            );
        }

        const token = await generateJWT(user.id);
        res.status(200).json({
            token,
            user
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

module.exports = { login }