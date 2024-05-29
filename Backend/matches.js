/*
  AUTHOR:               Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /matches

  Endpoints:
  - "/"
    GET: Get all matches
    POST: Create a new match
*/

const express = require('express')
const verifyAuth = require('./authentification')

const router = express.Router()

router.get('', verifyAuth, (req, res) => {
    // called when GET /api/matches
})

router.post('', verifyAuth, (req, res) => {
    // called when POST /api/matches
})

module.exports = router
