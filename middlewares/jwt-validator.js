const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWTValidate = async ( req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No token in request'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        //Verificar si existe en la DB
        if(!user) {
            return res.status(401).json({
                msg: 'Invalid Token - user does not exist in DB'
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid Token'
        })

    }

}


module.exports = {
    JWTValidate
}