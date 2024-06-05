/*
  VERSION:              Robin Trachsel
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

const express = require('express');
const crypto = require("node:crypto");

const { User } = require("./db/models");

const router = express.Router();

function verifyAuth(req, res, next) {
    if (req.session.authenticated) {
        next()
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
}

function verifyAdmin(req, res, next) {
    if (req.session.authenticated && req.session.role == "Admin") {
        next()
    } else {
        res.status(403).json({ error: 'Forbidden' })
    }
}

function sha256(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
};

router.post('/login', async (req, res) => {
    const { email } = req.body
    let { password } = req.body

    password = sha256(password)
    
    const entity = await User.findOne({ email: email});

    if (entity.passwordHash == password){
        req.session.authenticated = true
        req.session.email = entity.email
        req.session.role = entity.role;
        // return the whole user
        res.status(200).json(entity)
    }else {
        res.status(401).json({ error: 'User and Password do not match' })
    }
})

router.delete('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.sendStatus(500);
        }

        return res.sendStatus(204);
    });
});

router.get('/verify', verifyAuth, (req, res) => {
    res.status(200).json({ email: req.session.email, role: req.session.role});
});

module.exports = [
    router,
    verifyAuth,
    verifyAdmin,
    sha256
];
