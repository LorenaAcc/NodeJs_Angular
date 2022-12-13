const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidate } = require('../middlewares/fields-validator');

const { recipeExists, recipeExistsById } = require('../helpers/db-validators');

const { recipesGet, recipesPost, recipesPut, recipesDelete } = require('../controllers/recipes.controller');

const router = Router();


router.get('/', recipesGet);

//si pasan los checks del middleware => valida campos
// router.post('/',[
// 	check('email', 'Invalid email').isEmail(),
// 	check('email').custom(emailExists),
// 	check('password', 'The password is required and must be longer than 6 characters').isLength({min: 6}).not().isEmpty(),
// 	fieldsValidate
// ], usersPost);

router.put('/:id', [
	check('id', 'Invalid ID').isMongoId(),
	check('id').custom(recipeExistsById),
	fieldsValidate
],  recipesPut);

// router.delete('/:id', [
// 	JWTValidate,
// 	check('id', 'Invalid ID').isMongoId(),
// 	check('id').custom(userExistsById),
// 	fieldsValidate
// ], usersDelete);


module.exports = router;