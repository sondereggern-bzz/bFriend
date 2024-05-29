/*
  AUTHOR:               Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /authentification

  Endpoints:
  - "/login"
    POST: Login

  - "/logout"
    DELETE: Logout

  - "/verify"
    GET: Verify if user is logged in
*/

const express = require('express')

const router = express.Router()
const sqlQuery = require('./database')

function verifyAuth(req, res, next) {
    if (req.session.authenticated) {
        next()
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
}

async function findLogin(email, password) {
    const SQL = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
    const RESULT = await sqlQuery(SQL)

    return RESULT[0]
}

router.post('/login', async (req, res) => {
    const { email } = req.body
    const { password } = req.body
    
    const user = await findLogin(email, password)

    if (user) {
        req.session.authenticated = true
        req.session.userId = email
        // return the whole user
        res.status(200).json(user)
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
})

router.delete('/logout', (req, res) => {
    req.session.authenticated = false
    res.status(204).end()
})

router.get('/verify', verifyAuth, (req, res) => {
    res.status(200).json({ email: req.session.userId })
})

module.exports = [
    router,
    verifyAuth
]
