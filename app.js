const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const { info, error } = require('./utils/logger')
const blogRouter = require('./controllers/blog')

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs/', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
