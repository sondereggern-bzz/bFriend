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

const router = express.Router();

const users = [
    {
        email: '',
        password: 'm295'
    }
];

const verifyAuth = (req, res, next) => {
    if (req.session.authenticated) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const queryUser = (email, password) => {
    // query user from database
    return true
}

const verifyAdmin = (req, res, next) => {
    if (req.session.authenticated && req.session.userRole && req.session.userRole == "Admin") {
        next();
    } else {
        return res.sendStatus();
    }
};

const sha256 = (key) => {
    return crypto.createHash('sha256').update(key).digest('hex');
};

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!username || !password) return res.sendStatus(422);
    
    password = sha256(password);

    /* TODO: Switch this to use mysql connection package. */
    const user = await queryUser(email, password);

    if (!user) return res.status(401).send({ message: "Login has failed. Email or password is invalid." });

    /* TODO: Fetch UserRole from Database */
    const userRole = "User"; /* Roles: User, Admin */

    let tries = 0;
    while (!req.session.authenticated && !req.session.userId && tries < 3) {
        req.session.authenticated = true;
        req.session.userId = email;         /* email is assumed to be unique. */
        req.session.userRole = userRole;
        req.session.save();
        tries++;
    }

    return res.status(200).json({ email });
});

router.delete('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.sendStatus(500);
        }

        return res.sendStatus(204);
    });
});

router.get('/verify', verifyAuth, (req, res) => {
    res.status(200).json({ email: req.session.userId });
});

module.exports = [
    router,
    verifyAuth,
    verifyAdmin
];
