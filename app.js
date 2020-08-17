const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const itemsRouter = require('./controllers/items')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch(error => {
        logger.error(`Could not connect to MongoDB. Error: ${error.message}`)
    })

    
app.use(cors)
app.use(express.json())
app.use(express.static('build'))

app.use(middleware.reqLogger)

app.use('/api/items', itemsRouter)

app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
