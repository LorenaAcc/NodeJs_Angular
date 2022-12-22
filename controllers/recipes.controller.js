const { response, request } = require('express');

const Recipe = require('../models/recipe');

const recipesGet = async (req = request, res = response) => {

    try{

        const recipes = await Recipe.find();
        
        res.status(200).json(
            recipes
        );

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: 'Could not get recipes. Talk to the administrator'
        })

    }

}

const recipesPut = async (req, res = response) => {
    try {
		const recipes = req.body;

		await Recipe.deleteMany({});

		recipes.forEach(async aRecipe => {
			const recipe = new Recipe(aRecipe);
			await recipe.save();
		});

		res.status(200).json({
			msg: "Recipes updated/saved",
            recipes
		}); 

	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "Recipes could not be updated/saved. Talk to the administrator"
		});
	}

}


module.exports = {
    recipesGet,
    recipesPut
}