
const { Router } = require('express')

const dealController = require('./controllers/DealController')
const opportunityController = require('./controllers/OpportunityController')

const routes = new Router()

routes.post('/integrateDeals', dealController.integrateDeals)
routes.get('/opportunities', opportunityController.consult)

module.exports = routes
