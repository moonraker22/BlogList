const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    request.token = authorization.substring(7)
    logger.info('TOKEN', request.token)
    next()
  } catch (TypeError) {
    next()
  }
}

const userExtractor = async (request, response, next) => {
  try {
    const auth = request.get('authorization')
    const token = auth.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
    logger.info('USER', request.user)
    next()
  } catch (TypeError) {
    next()
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
