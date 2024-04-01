import joi from 'joi';

export const validateCourse = (data) => {
    const schema = joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
    });

    return schema.validate(data);
};