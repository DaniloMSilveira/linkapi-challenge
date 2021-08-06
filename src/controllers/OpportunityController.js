const opportunityRepository = require('../repositories/OpportunityRepository')

const MissingParamError = require('../errors/MissingParamError')
const DateInvalidFormatError = require('../errors/DateInvalidFormatError')
const DateIntervalInvalidError = require('../errors/DateIntervalInvalidError')

const regexDateBR = require('../utils/regexDateBR')

class OpportunityController {
  async consult (req, res) {
    const { startDate, endDate } = req.query

    if (!startDate) throw new MissingParamError('startDate')
    if (!endDate) throw new MissingParamError('endDate')
    if (!regexDateBR(startDate)) throw new DateInvalidFormatError('startDate')
    if (!regexDateBR(endDate)) throw new DateInvalidFormatError('endDate')

    const startDateObj = new Date(`${startDate} 00:00:00`)
    const endDateObj = new Date(`${endDate} 00:00:00`)

    if (endDateObj < startDateObj) throw new DateIntervalInvalidError(startDate, endDate)

    const result = await opportunityRepository.consult(startDate, endDate)
    return res.json({
      status: 'success',
      data: result
    })
  }
}

module.exports = new OpportunityController()
