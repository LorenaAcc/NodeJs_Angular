const User = require('../models/user');
const Recipe = require('../models/recipe');

const emailExists = async(email = '') => {
    //Verificar si el correo existe
    const _emailExists = await User.findOne({ email });
    if(_emailExists) {
        throw new Error(`The email '${email}' is already registered`);
    }
}

const userExistsById = async(id) => {
    //Verificar si el usuario existe
    const userExists = await User.findById( id );
    if(!userExists) {
        throw new Error(`The id '${id}' does not exist`);
    }
}

const recipeExistsById = async(id) => {
    //Verificar si la receta existe
    const recipeExists = await Recipe.findById( id );
    if(!recipeExists) {
        throw new Error(`The id '${id}' does not exist`);
    }
}

module.exports = {
    emailExists,
    userExistsById,
    recipeExistsById
}