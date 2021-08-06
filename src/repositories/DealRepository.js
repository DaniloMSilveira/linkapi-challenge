require('dotenv/config')
const pipedrive = require('../services/pipedrive')

const AppError = require('../errors/AppError')
const NothingResultError = require('../errors/NothingResultError')

const postDealInBling = require('../services/postDealInBling')

const opportunityRepository = require('../repositories/OpportunityRepository')

class DealRepository {
  async integrateDeals () {
    try {
      // List all deals with status "won" and then order by "won_time" DESC, having a limit to 50 rows
      const response = await pipedrive.get(`deals?status=won&sort=won_time DESC&limit=50&api_token=${process.env.API_TOKEN_PIPEDRIVE}`)
      const deals = response.data.data
      if (!deals) {
        throw new NothingResultError('deals')
      }
      deals.map(async deal => {
        const exist = await opportunityRepository.exists({ idDeal: deal.id })
        if (!exist) {
          await postDealInBling(deal)
          const opportunity = {
            idDeal: deal.id,
            title: deal.title,
            personName: deal.person_name,
            orgName: deal.org_name,
            status: deal.status,
            value: deal.value,
            startDate: deal.add_time,
            wonDate: deal.won_time
          }
          await opportunityRepository.insert(opportunity)
        }
        return true
      })
      return 'Foi realizado a integração de novas negociações com status "ganho" do Pipedrive para o Bling'
    } catch (err) {
      throw new AppError('DealRepositoryError - integrateDeals', err.message)
    }
  }
}

module.exports = new DealRepository()
