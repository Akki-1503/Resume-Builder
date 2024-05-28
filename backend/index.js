require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./configDb/db')
const usersCtlr = require('./app/controllers/userControllers')
const authenticateUser = require('./app/middlewares/authenticate')
const authorizeUser = require('./app/middlewares/authorization')

const app = express()

const PORT = 3321

configureDB()
app.use(express.json())
app.use(cors())

app.post('/api/users/register', usersCtlr.register)
app.post('/api/users/login', usersCtlr.login)
app.get('/api/users/account',authenticateUser ,usersCtlr.account)
app.get('/api/users/:role', authenticateUser, usersCtlr.role)
app.post('/api/users/reset-password', usersCtlr.resetPassword)

app.listen(PORT, () => {
    console.log('server running on port', PORT)
})
