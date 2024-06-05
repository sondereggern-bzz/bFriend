/*
  AUTHOR:               Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server that links every JavaScript file together to build the backend
*/

const express = require('express')
const session = require('express-session')
const cors = require('cors')

const mongoose = require('mongoose');
const { Images, Matches, Messages, User } = require('./db/models')
const runDBConnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bFriend-database");
        if (!User.exists()) {
            await User.createCollection();
        }
        if (!Messages.exists()) {
            await Messages.createCollection();
        }
        if (!Matches.exists()) {
            await Matches.createCollection();
        }
        if (!Images.exists()) {
            await Images.createCollection();
        }
    } catch (error) {
        console.error(`[ERROR]: ${error}`);
    }    
}

const authentification = require('./authentification.js')
const user = require('./users.js')
const admin = require('./admin.js')
const payments = require('./payments.js')
const messages = require('./messages.js')
const subscriptions = require('./subscriptions.js')
const matches = require('./matches.js')
const search = require('./search.js')

const app = express()
const port = 3000

runDBConnection();

app.use(cors({origin: "*"}))
app.use(session({ secret: 'geheim', resave: false, saveUninitialized: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    const date = new Date();
    console.log(`[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]\t${req.method}\t${req.path}`);
    next();
})

app.use('/api/authentification', authentification)
app.use('/api/users', user)
app.use('/api/admin', admin)
app.use('/api/payments', payments)
app.use('/api/messages', messages)
app.use('/api/subscriptions', subscriptions)
app.use('/api/matches', matches)
app.use('/api/search', search)

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' })
})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`)
})
