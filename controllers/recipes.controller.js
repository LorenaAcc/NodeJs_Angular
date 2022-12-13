const { response, request } = require('express');

const Recipe = require('../models/recipe');

const recipesGet = async (req = request, res = response) => {

    const {limit = 5, from = 0} = req.query;
    //const query = {estado: true};

    const [total, recipes] = await Promise.all([
        Recipe.countDocuments().all(),
        Recipe.findAll()
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        recipes
    });
}

const recipesPut = async (req, res = response) => {
    const {id} = req.params;
    const { _id, ...rest } = req.body;

    // To Do validar contra base de datos


    const recipe = await User.findByIdAndUpdate(id, rest);

    res.json(recipe);
}


module.exports = {
    recipesGet,
    recipesPut
}