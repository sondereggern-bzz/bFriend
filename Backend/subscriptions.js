/*
  VERSION:              Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /subscriptions

  Endpoints:
  - ""
    GET: Get all subscriptions

  - "/:id/suspend"
    PUT: Suspend subscription by id

  - "/:id/activate"
    PUT: Activate subscription by id
*/

const express = require('express')
const verifyAuth = require('./authentifizierung')

const router = express.Router()

router.get('', (req, res) => {
    // called when GET /api/subscriptions
})

router.put('/:id/suspend', verifyAuth, (req, res) => {
    // called when GET /api/subscriptions/:id
})

router.put('/:id/activate', verifyAuth, (req, res) => {
    // called when GET /api/subscriptions/:id
})

module.exports = router
