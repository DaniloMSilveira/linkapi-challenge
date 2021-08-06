const mongoose = require('mongoose')

const OpportunitySchema = new mongoose.Schema({
  idDeal: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  personName: {
    type: String
  },
  orgName: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  wonDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const OpportunityModel = mongoose.model('opportunity', OpportunitySchema)

module.exports = OpportunityModel
