import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

/**
 * Validates user signup data.
 * @param {Object} data - The user signup data to be validated.
 * @returns {Object} - The validation result.
 */
export const validateSignup = (data) => {
    const schema = joi.object({
        username: joi.string().required().label('Username'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    });

    return schema.validate(data);
};

/**
 * Validates user login data.
 * @param {Object} data - The user login data to be validated.
 * @returns {Object} - The validation result.
 */
export const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    });

    return schema.validate(data);
};
