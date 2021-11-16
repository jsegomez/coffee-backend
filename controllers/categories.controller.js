const { request, response } = require('express');
const { Category } = require('../models/index');

const getAllCategories = async(req = request, res = response) => {
    try {
        const categories = await Category.find({status: true});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);        
    }
}

const getCategoryById = async(req = request, res = response) => {
    const id = req.params.id;

    try {
        const category = await Category.findOne({_id: id, status: true});       

        if(!category){
            res.status(404).json({
                message: `Categoría con Id: ${id} no existe en base de datos`
            });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
}

const create = async(req = request, res = response) => {
    const { name } = req.body;
    const { id: user } = req.user;

    try {
        const unique = await Category.findOne({name});
        if(unique){
            res.status(400).json({
                message: 'Categoría ya fue registrada'
            });
            return;
        }

        const category = new Category({name, user});
        await category.save();

        res.status(201).json({        
            category
        });        
    } catch (error) {
        res.status(500).json(error);
    }
}

const update = async(req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const categoryDB = await Category.findById(id);
        if(!categoryDB){
            return res.status(404).json({message: `Categoría con Id ${id} no encontrada`});
        }

        const category = await Category.findByIdAndUpdate(id, {name}, {new: true});
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteCategory = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const categoryDB = await Category.findById(id);
        if(!categoryDB){
            return res.status(404).json({message: `Categoría con Id ${id} no encontrada`});
        }

        const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
}

const activateCategory = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const categoryDB = await Category.findById(id);        
        if(!categoryDB){
            return res.status(404).json({message: `Categoría con Id ${id} no encontrada`});
        }

        const category = await Category.findByIdAndUpdate(id, {status: true}, {new: true});
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    create, update,
    deleteCategory,
    activateCategory
}