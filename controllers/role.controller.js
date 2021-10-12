const { request, response } = require('express');
const Role = require('../models/role.model');

const getRoles = async(req = request, res = response) => {
    const roles = await Role.find({state: true});
    if (roles.length == 0) {
        res.status(404).json({
            message: 'Sin registros en base de datos'
        });
    }

    res.status(200).json(roles);
}

const findById = async(req = request, res = response) => {
    const id = req.params.id;
    const role = await Role.findById(id);

    if(!role){
        res.status(404).json({
            message: 'Rol no existe en base de datos'
        });
    }

    res.status(200).json(role);
}

const save = async(req = request, res = response) => {
    const { role, status } = req.body;
    const newRole = new Role({role, status});
    const uniqueRole = await Role.findOne({role});

    if(uniqueRole){
        res.status(404).json({
            message: 'Rol ya fue registrado'
        });
    }

    await newRole.save();
    res.status(201).json(newRole);
}

const update = async(req = request, res = response) => {
    const id = req.params.id;
    const { status, ...role } = req.body;    
    const roleUpdate = await Role.findByIdAndUpdate(id, role, {new: true});
    
    res.status(201).json(roleUpdate);
}

const deleteRole = async(req = request, res = response) => {
    const id = req.params.id;
    let role = await Role.findById(id);
    if(!role){
        res.status(404).json({
            message: 'Rol no existe en base de datos'
        });
    }

    role.state = false;
    await Role.findByIdAndUpdate(id, role, {new: true});
    res.status(201).json(role);
}

const enableRole = async(req = request, res = response) => {
    const id = req.params.id;
    let role = await Role.findById(id);
    if(!role){
        res.status(404).json({
            message: 'Rol no existe en base de datos'
        });
    }
    
    role.state = true;
    await Role.findByIdAndUpdate(id, role, {new: true});
    res.status(201).json(role);
}
module.exports = { getRoles, findById, save, update, deleteRole, enableRole }