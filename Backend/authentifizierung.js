/*
  AUTHOR:              Robin Trachsel
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

const users = [
    {
        email: '',
        password: 'm295'
    }
]

function verifyAuth(req, res, next) {
    if (req.session.authenticated) {
        next()
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
}

router.post('/login', (req, res) => {
    const { email } = req.body
    const { password } = req.body
    const user = users.find((login) => email && login.password === password)

    if (user) {
        req.session.authenticated = true
        req.session.userId = email // assuming email is unique
        res.status(201).json({ email })
    } else {
        res.status(401).json({ error: 'Login failed' })
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
