const QuoteController = require('../Controllers/QuoteController')
const upload = require('../MiddleWares/upload')

const express = require('express')
const route = express.Router()

route.post('/products', QuoteController.indexQuote)
route.post('/products/add',upload, QuoteController.storeQuote)
route.post('/products/delete', QuoteController.deleteQuote)
route.post('/products/mail', QuoteController.mail)


module.exports = route;