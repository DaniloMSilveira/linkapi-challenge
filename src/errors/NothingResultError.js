const AppError = require('./AppError')

class NothingResultError extends AppError {
  constructor (paramName) {
    super('NothingResultError', `Não foi encontrado nenhum registro de "${paramName}"`)
  }
}

module.exports = NothingResultError
