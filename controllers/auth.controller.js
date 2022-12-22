const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

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
            email: validUser.email,
            localId: validUser.localId,
            idToken: token,
            expiresIn: validUser.expiresIn
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Sign in denied. Talk to the administrator'
        })
    }

}


const signUp = async(req, res = response) => {
    const { email, password, id } = req.body;

    try{
        //Verificar si el email existe
        let user = await User.findOne({email});

        if(!user) {
            const data = {
                    email: email,
                    password: password,
            };  
        
        user = new User(data);
        console.log('nuevo usuario: ' + user.email);
        
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );

        //Guardar en DB
        await user.save();  
        } else { console.log('Ya existe usuario')}

        //Generar el JWT
        const token = await generateJWT(id);

        user.idToken=token;
		await user.save();

            res.json({
                email: user.email,
                localId: user.localId,
                idToken: user.IdToken,
                expiresIn: user.expiresIn
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Sign up denied. Talk to the administrator'
        })
    }

}

module.exports = {
    signIn,
    signUp
}