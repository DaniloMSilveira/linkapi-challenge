const dealRepository = require('../repositories/DealRepository')

class DealController {
  async integrateDeals (req, res) {
    const result = await dealRepository.integrateDeals()
    return res.json({
      status: 'success',
      message: result
    })
  }
}

module.exports = new DealController()
