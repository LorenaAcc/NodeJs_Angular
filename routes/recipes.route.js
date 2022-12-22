const { Router } = require('express');
//const { check } = require('express-validator');

const { fieldsValidate } = require('../middlewares/fields-validator');
const { JWTValidate } = require('../middlewares/jwt-validator');


const { recipesGet, recipesPut } = require('../controllers/recipes.controller');

const router = Router();


router.get('/fetch', recipesGet);


router.put('/save', recipesPut);



module.exports = router;