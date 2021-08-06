const request = require('supertest')
const app = require('../app')

const MissingParamError = require('../errors/MissingParamError')
const DateInvalidFormatError = require('../errors/DateInvalidFormatError')
const DateIntervalInvalidError = require('../errors/DateIntervalInvalidError')

describe('Testes para Opportunity', () => {
  test('Deve retornar 400 devido faltar o parâmetro "startDate"', async () => {
    const query = {
      endDate: '2021-08-05'
    }
    const httpResponse = await request(app)
      .get('/opportunities')
      .query(query)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.status).toBe('error')
    expect(httpResponse.body.type).toEqual('MissingParamError')
    expect(httpResponse.body.message).toEqual(new MissingParamError('startDate').message)
  })

  test('Deve retornar 400 devido faltar o parâmetro "endDate"', async () => {
    const query = {
      startDate: '2021-08-05'
    }
    const httpResponse = await request(app)
      .get('/opportunities')
      .query(query)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.status).toBe('error')
    expect(httpResponse.body.type).toEqual('MissingParamError')
    expect(httpResponse.body.message).toEqual(new MissingParamError('endDate').message)
  })

  test('Deve retornar 400 devido o parâmetro "startDate" estar em formato inválido', async () => {
    const query = {
      startDate: '2021/08/05',
      endDate: '2021-08-05'
    }
    const httpResponse = await request(app)
      .get('/opportunities')
      .query(query)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.status).toBe('error')
    expect(httpResponse.body.type).toEqual('DateInvalidFormatError')
    expect(httpResponse.body.message).toEqual(new DateInvalidFormatError('startDate').message)
  })

  test('Deve retornar 400 devido o parâmetro "endDate" ser uma data inválida', async () => {
    const query = {
      startDate: '2021-08-05',
      endDate: '2021-13-05'
    }
    const httpResponse = await request(app)
      .get('/opportunities')
      .query(query)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.status).toBe('error')
    expect(httpResponse.body.type).toEqual('DateInvalidFormatError')
    expect(httpResponse.body.message).toEqual(new DateInvalidFormatError('endDate').message)
  })

  test('Deve retornar 400 devido o parâmetro "endDate" ser uma data menor que a do parâmetro "startDate"', async () => {
    const query = {
      startDate: '2021-08-05',
      endDate: '2021-08-04'
    }
    const httpResponse = await request(app)
      .get('/opportunities')
      .query(query)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.status).toBe('error')
    expect(httpResponse.body.type).toEqual('DateIntervalInvalidError')
    expect(httpResponse.body.message).toEqual(new DateIntervalInvalidError(query.startDate, query.endDate).message)
  })

  test('Deve retornar 200 com o status de "success"', async () => {
    const query = {
      startDate: '2021-08-05',
      endDate: '2021-08-05'
    }
    const httpResponse = await request(app)
      .get('/opportunities')
      .query(query)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.status).toBe('success')
  })
})
