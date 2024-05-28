/*
  VERSION:              Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /payments

  Endpoints:
  - "/:name"
    GET: Get currency by id (e.g. CHF, EUR, USD)
*/

const express = require('express')

const router = express.Router()

router.get('/:name', (req, res) => {
    // called when GET /api/payments/:id
    // :name is the currency name (e.g. CHF, EUR, USD) with which the payment is made
    // this function calls the free 
    // https://app.freecurrencyapi.com/dashboard
})

module.exports = router