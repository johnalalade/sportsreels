const UserController = require('../Controllers/UserController')
const authenticate = require('../Middleware/authenticate')

const express = require('express')
const user = express.Router()

user.post('/register', UserController.register)
user.post('/login', UserController.login)
user.post('/users/showone', authenticate, UserController.showUser)
user.post('/users/update', authenticate, UserController.update)
user.post('/payment', authenticate, UserController.payment)
user.post('/loan', authenticate, UserController.loaning)

module.exports = user