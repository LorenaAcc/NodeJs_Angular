const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fields-validator');
const { signIn, signUp } = require('../controllers/auth.controller');
const { emailExists, emailNotExists } = require('../helpers/db-validators');


const router = Router();


router.post('/signIn', [
    check('email', 'Email required').isEmail(),
    check('email').custom(emailNotExists),
    check('password', 'The password is required and must be longer than 6 characters').isLength({min: 6}).not().isEmpty(),
    fieldsValidate
], signIn);

router.post('/signUp', [
    check('email', 'Email required').isEmail(),
    check('email').custom(emailExists),
    check('password', 'The password is required and must be longer than 6 characters').isLength({min: 6}).not().isEmpty(),
    fieldsValidate
], signUp);




module.exports = router;