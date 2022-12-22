const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config.db');

class Server{

    constructor() {
        //Crea en el servidor la app express como una propiedad en la clase Server
        this.app = express();

        //Configuración del puerto
        this.port= process.env.PORT;

        //Define url de usuarios
        this.authPath = '/api/auth';
        
        //Define url de recetas
        this.recipesPath = '/api/recipes';
        
        //Conectar a base de datos
        this.conectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.route'));
 
        this.app.use(this.recipesPath, require('../routes/recipes.route'));
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Server running on port: '.magenta, this.port.red);
        })
    }


}







module.exports = Server;