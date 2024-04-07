import Joi from "joi";

const addressValidation = Joi.object({
    line1: Joi.string().required().min(8),
    line2: Joi.string().allow('').optional(),
    city: Joi.string().required(),
    country: Joi.string().required().uppercase(),
    zipCode: Joi.string().required().max(10)
});

export const validateCreateContact = Joi.object({
    firstName: Joi.string().required().min(3).pattern(/^[A-Za-z]+$/),
    lastName: Joi.string().required().min(3).pattern(/^[A-Za-z]+$/),
    gender: Joi.string().required().valid('MALE', 'FEMALE', 'OTHERS'),
    address: addressValidation.required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/),
    other: Joi.string().allow('').optional()
});


export const validateUpdateContact = Joi.object({
    id: Joi.string().allow('').optional(),
    firstName: Joi.string().min(3).pattern(/^[A-Za-z]+$/).optional().allow(''),
    lastName: Joi.string().min(3).pattern(/^[A-Za-z]+$/).optional().allow(''),
    address: Joi.object({
        line1: Joi.string().min(8).optional().allow(''),
        line2: Joi.string().optional().allow(''),
        city: Joi.string().optional().allow(''),
        country: Joi.string().uppercase().optional().allow(''),
        zipCode: Joi.string().max(10).optional().allow('')
    }).optional(),
    email: Joi.string().email().optional().allow(''),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional().allow('')
}).options({ presence: 'optional' });


export const validateDeleteList = Joi.object({
    listId: Joi.array().items(Joi.string())
})

export const validateAddTwoNumber = Joi.object({
    num1: Joi.required(),
    num2: Joi.required()
})

