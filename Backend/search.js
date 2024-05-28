/*
  VERSION:              Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /search

  Endpoints:
  - "/radius/:radius"
    GET: Get all areas within a certain radius

  - "/areas/:zip"
    GET: Get all areas with a certain zip code
*/

const express = require('express')
const verifyAuth = require('./authentifizierung')

const router = express.Router()

router.get('/radius/:radius', verifyAuth, (req, res) => {
    // called when GET /api/search/radius/:radius
})

router.get('/areas/:zip', verifyAuth, (req, res) => {
    // called when GET /api/search/areas/:zip
})

module.exports = router
