const User = require('../models/user');
const Recipe = require('../models/recipe');

const emailExists = async(email = '') => {
    //Verificar si el correo existe
    const _emailExists = await User.findOne({ email });
    if(_emailExists) {
        throw new Error(`The email '${email}' is already registered`);
    }
}

const emailNotExists = async(email = '') => {
    //Verificar si el correo existe
    const _emailExists = await User.findOne({ email });
    if(!_emailExists) {
        throw new Error(`The email '${email}' is not registered`);
    }
}



module.exports = {
    emailExists,
    emailNotExists
}