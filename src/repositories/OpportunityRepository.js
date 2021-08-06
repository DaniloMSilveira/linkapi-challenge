const Opportunity = require('../models/Opportunity')

const AppError = require('../errors/AppError')

class OpportunityRepository {
  async consult (startDate, endDate) {
    try {
      const opportunities = await Opportunity.find({
        wonDate: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lt: new Date(`${endDate}T00:00:00Z`)
        }
      })
      return opportunities
    } catch (err) {
      throw new AppError('OpportunityRepositoryError - consult', err.message)
    }
  }

  async insert (opportunity) {
    try {
      await Opportunity.insertMany([opportunity])
      return true
    } catch (err) {
      throw new AppError('OpportunityRepositoryError - insert', err.message)
    }
  }

  async exists (filter) {
    try {
      const response = await Opportunity.exists(filter)
      return response
    } catch (err) {
      throw new AppError('OpportunityRepositoryError - insert', err.message)
    }
  }
}

module.exports = new OpportunityRepository()
