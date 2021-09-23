const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
    res.status(200).json({
        mensaje: 'Todo OK'
    });
}

const findById = (req, res = response) => {
    const id = req.params.id;

    res.status(200).json({
        id
    });
}

const create = (req, res = response) => {
    const data = req.body;

    res.status(200).json({
        data
    });
}

const update = (req, res = response) => {
    const data = req.body;

    res.status(200).json({
        data
    });
}



module.exports = { getUsers, create, findById, update }