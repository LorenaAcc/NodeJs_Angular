const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const usersGet = async (req = request, res = response) => {

    const {limit = 5, from = 0} = req.query;
    //const query = {estado: true};

    const [total, users] = await Promise.all([
        User.countDocuments().all(),
        User.findAll()
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async(req, res = response) => {

    const { email, password } = req.body;
    const user = new User( {email, password} );

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD


    await user.save();

    res.json({
        user
    });
}

const usersPut = async (req, res = response) => {
    const {id} = req.params;
    const { _id, password, email, ...rest } = req.body;

    // To Do validar contra base de datos
    if(password) {
        //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    res.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
}


const usersDelete = async (req, res = response) => {

    const {id} = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    const user = await Usuario.findByIdAndUpdate(id);

    res.json(user);
}




module.exports = { 
    usersGet,
    usersPost,
    usersPut,
    usersDelete 
}