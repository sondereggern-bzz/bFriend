/*
  VERSION:              Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /messages

  Endpoints:
  - ""
    GET: Get all messages
    POST: Create a new message
*/

const express = require('express')
const verifyAuth = require('./authentifizierung')

const router = express.Router()

router.get('', verifyAuth, (req, res) => {
    // called when GET /api/messages
})

router.post('', verifyAuth, (req, res) => {
    // called when POST /api/messages
})

module.exports = router
