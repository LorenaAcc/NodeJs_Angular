const { validationResult } = require('express-validator');



const fieldsValidate = (req, res, next) => {
//next es a quién tengo que llamar si el middleware pasa
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log('error en validar campos - middlewares');
        return res.status(400).json(errors);
    }else{ console.log('OK en validar campos - middlewares');}

    //si llega a este punto, sigue con el siguiente middleware
    next();
}




module.exports = { 
    fieldsValidate 
}