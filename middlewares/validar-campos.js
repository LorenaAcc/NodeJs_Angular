const { validationResult } = require('express-validator');



const validarCampos = (req, res, next) => {
//next es a quién tengo que llamar si el middleware pasa
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //si llega a este punto, sigue con el siguiente middleware
    next();
}




module.exports = { 
    validarCampos 
}