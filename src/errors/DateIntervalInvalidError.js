
const AppError = require('./AppError')

class DateIntervalInvalidError extends AppError {
  constructor (startDate, endDate) {
    super('DateIntervalInvalidError', `The end date "${endDate}" date is less than the start date "${startDate}"`)
  }
}

module.exports = DateIntervalInvalidError
