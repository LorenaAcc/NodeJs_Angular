const fieldsValidate  = require('../middlewares/fields-validator');
const JWTValidate  = require('../middlewares/jwt-validator');

module.exports = {
    ...fieldsValidate,
    ...JWTValidate
}