require('dotenv/config')
require('express-async-errors')
require('reflect-metadata')

const express = require('express')

const db = require('./database')
const routes = require('./routes.js')

const AppError = require('./errors/AppError')

class App {
  constructor () {
    this.server = express()
    this.middlewares()
    this.connectDb()
    this.routes()
    this.handlerErrors()
  }

  middlewares () {
    this.server.use(express.json())
  }

  connectDb () {
    db.connect(process.env.URL_MONGO)
  }

  routes () {
    this.server.use(routes)
  }

  handlerErrors () {
    this.server.use((err, req, res, next) => {
      if (err instanceof AppError) {
        res.status(err.statusCode).json({
          status: 'error',
          type: err.type,
          message: err.message
        })
      } else {
        res.status(500).json({
          status: 'error',
          type: 'Internal server error',
          message: `Internal server error ${err.message}`
        })
      }
    })
  }
}

module.exports = new App().server
