const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fields-validator');
const { signIn, signUp } = require('../controllers/auth.controller');


const router = Router();


router.post('/signIn', [
    check('email', 'Email required').isEmail(),
    check('password', 'Password required').not().isEmpty(),
    fieldsValidate
], signIn);

router.post('/signUp', [
    check('email', 'Email required').isEmail(),
    check('password', 'Password required').not().isEmpty(),
    fieldsValidate
], signUp);




module.exports = router;