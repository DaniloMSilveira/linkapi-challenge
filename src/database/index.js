const mongoose = require('mongoose')

class Database {
  connect (URL_MONGO) {
    mongoose.connect(URL_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}

module.exports = new Database()
