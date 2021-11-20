const UserController = require('../Controllers/UserController')
const authenticate = require('../Middleware/authenticate')
const upload = require('../Middleware/upload')

const express = require('express')
const user = express.Router()

user.post('/register', upload, UserController.register)
user.post('/login', UserController.login)
user.post('/users/showone', authenticate, UserController.showOne)
user.post('/users', authenticate, UserController.indexProfile)
user.post('/users/updateone',  authenticate, upload, UserController.updateProfile)


module.exports = user

//authenticate,