const { response, request } = require('express');
const bcrypt = require('bcrypt');

// Model
const User = require('../models/user.model');

const getUsers = async(req = request, res = response) => {
    const { from = 0, limit = 10 } = req.query;
    
    const [total, users] = await Promise.all([
        User.countDocuments({state: true}),
        User.find({state: true})
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    if(users.length == 0){
        res.status(404).json({
            message: 'No se encontraron registros'
        });
    }

    const quantity = users.length;
    res.status(200).json({users, quantity,total});
}

const findById = async(req = request, res = response) => {
    const id = req.params.id;
    const user = await User.findById(id);

    res.status(200).json(user);
}

const create = async(req = request, res = response) => {
    const { name, lastName, email, password, role } = req.body;
    const user = new User({name, lastName, email, password, role});

    const salt = bcrypt.genSaltSync(11);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json(user);
}

const update = async(req = request, res = response) => {
    const id = req.params.id;
    const { state, role, google, password, ...user } = req.body;

    const findDuplicateEmail = await User.findOne({ email: user.email });

    if(findDuplicateEmail && findDuplicateEmail.id != id){
        res.status(404).json({
            message: 'Correo electrónico ya esta en uso'
        });
    }
        
    const userUpdated = await User.findByIdAndUpdate(id, user, {new: true});

    res.status(200).json(userUpdated);
}

const disableUser = async(req = request, res = response) => {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, {state: false}, {new: true});

    res.status(200).json({
        ok: true
    });
}

const deleteUser = async(req = request, res = response) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        ok: true
    });
}

module.exports = { getUsers, create, findById, update, deleteUser }