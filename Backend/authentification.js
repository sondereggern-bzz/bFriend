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
const sqlQuery = require('./database');

const router = express.Router();

function verifyAuth(req, res, next) {
    if (req.session.authenticated) {
        next()
    } else {
        res.status(401).json({ error: 'Unauthorized' })
    }
}

function verifyAdmin(req, res, next) {
    if (req.session.authenticated && req.session.userRole == "Admin") {
        next()
    } else {
        return res.sendStatus()
    }
}

async function findLogin(email, password) {
    const SQL = `SELECT 
                Users.ID AS userID, Users.prename, Users.name, Users.email, Users.password, Users.locked, Users.created_at, Users.updated_at, Address.street, Address.houseNumber, City.name AS cityName, City.zip, Address.country, Gender.name AS gender, Role.name AS role, Subscription.name AS subscription, Subscription.price AS subscriptionPrice, Payment.prename AS paymentPrename, Payment.name AS paymentName, Payment.iban, Payment.bic, GROUP_CONCAT(DISTINCT Hobbies.name) AS hobbies, GROUP_CONCAT(DISTINCT UserImages.image) AS images
                FROM Users
                JOIN Address ON Users.addressID = Address.ID
                JOIN City ON Address.cityID = City.ID
                JOIN Gender ON Users.genderID = Gender.ID
                JOIN Role ON Users.roleID = Role.ID
                JOIN Subscription ON Users.subscriptionID = Subscription.ID
                JOIN Payment ON Users.paymentID = Payment.ID
                LEFT JOIN UserHobbies ON Users.ID = UserHobbies.userID
                LEFT JOIN Hobbies ON UserHobbies.hobbyID = Hobbies.ID
                LEFT JOIN UserImages ON Users.ID = UserImages.userID
                WHERE Users.email = '${email}' AND Users.password = '${password}'
                GROUP BY Users.ID, Users.prename, Users.name, Users.email, Users.password, Users.locked, Users.created_at, Users.updated_at, Address.street, Address.houseNumber, City.name, City.zip, Address.country, Gender.name, Role.name, Subscription.name, Subscription.price, Payment.prename, Payment.name, Payment.iban, Payment.bic;`
                
    const RESULT = await sqlQuery(SQL)

    return RESULT[0]
}

function sha256(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
};

router.post('/login', async (req, res) => {
    const { email } = req.body
    let { password } = req.body

    password = sha256(password)
    
    const user = await findLogin(email, password)

    if (user) {
        req.session.authenticated = true
        req.session.userId = user.email
        req.session.roleId = user.role;
        // return the whole user
        res.status(200).json(user)
    } else {
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
    res.status(200).json({ email: req.session.userId });
});

module.exports = [
    router,
    verifyAuth,
    verifyAdmin
];
