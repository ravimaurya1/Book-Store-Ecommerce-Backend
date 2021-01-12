const Joi = require('@hapi/joi');

// Register Validation

const registerValidation = (data)=>{
    const schema = Joi.object({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        // about: Joi.string(),
        // role: Joi.required(),
        // history: Joi.required()
    });
    const validate = schema.validate(data);
    return validate;
};

const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    const validate = schema.validate(data);
    return validate;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;