
const AppError = require('./AppError')

class DateInvalidFormatError extends AppError {
  constructor (paramName) {
    super('DateInvalidFormatError', `Date format for param "${paramName}" is invalid. Expect format: YYYY-MM-DD`)
  }
}

module.exports = DateInvalidFormatError
