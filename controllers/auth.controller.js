const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { usersPost } = require('./users.controller');
//const { googleVerify } = require('../helpers/google-verify');

const signIn = async(req, res = response) => {
    const { email, password } = req.body;
    console.log(email);
    try{
        //Verificar si el email existe
        const validUser = await User.findOne({email});
        
        if(!validUser) {
            return res.status(400).json({
                msg: 'Wrong User / Password - email'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: 'Wrong User / Password - password'
            });
        }
        //Generar el JWT
        const token = await generateJWT(validUser.id);

        res.json({
            validUser,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


const signUp = async(req, res = response) => {
    const { email, password, id } = req.body;

    try{
        //Verificar si el email existe
        let user = await User.findOne({email});
        console.log(email + 'Holaaaa signup')
        if(!user) {
            console.log(email + 'Holaaaa signup 2')
            const data = {
                    email: email,
                    password: password,
            };  
        
        user = new User(data);
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );

        //Guardar en DB
        await user.save();  
        } 

        //Generar el JWT
        const token = await generateJWT(id);

            res.json({
            user,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    signIn,
    signUp
}