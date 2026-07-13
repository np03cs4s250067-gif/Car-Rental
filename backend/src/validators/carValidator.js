import {body, validationResult} from 'express-validator'

export const carRules = [
    body('model')
    .notEmpty()
    .isString()
    .trim()
    .withMessage('name is required, must be a string'),

    body('rate')
    .notEmpty()
    .isInt({min: 3000})
    .withMessage('Price must be a positive integer'),

    body('available')
    .notEmpty()
    .isBoolean()
    .withMessage('Availability must be provided')
]

export const handleCarValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    next()
}