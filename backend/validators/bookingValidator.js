import { body, validationResult } from 'express-validator'

export const bookingRules = [
  body('carId')
    .notEmpty()
    .withMessage('Car ID is required')
    .isMongoId()
    .withMessage('Invalid Car ID format'),

  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),

  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      const start = new Date(req.body.startDate)
      const end = new Date(value)
      if (end <= start) {
        throw new Error('End date must be after start date')
      }
      return true
    }),
]

export const handleBookingValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
