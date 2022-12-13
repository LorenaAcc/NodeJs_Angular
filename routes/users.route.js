const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidate, JWTValidate } = require('../middlewares');

const { emailExists, userExistsById } = require('../helpers/db-validators');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users.controller');

const router = Router();


router.get('/', usersGet);

//si pasan los checks del middleware => valida campos
router.post('/',[
	check('email', 'Invalid email').isEmail(),
	check('email').custom(emailExists),
	check('password', 'The password is required and must be longer than 6 characters').isLength({min: 6}).not().isEmpty(),
	fieldsValidate
], usersPost);

router.put('/:id', [
	check('id', 'Invalid ID').isMongoId(),
	check('id').custom(userExistsById),
	fieldsValidate
],  usersPut);

router.delete('/:id', [
	JWTValidate,
	check('id', 'Invalid ID').isMongoId(),
	check('id').custom(userExistsById),
	fieldsValidate
], usersDelete);


module.exports = router;