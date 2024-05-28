/*
  VERSION:              Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /admin

  Endpoints:
  - "/users/:id/lock"
    PUT: Lock user by id

  - "/users/:id/unlock"
    PUT: Unlock user by id

  - "/messages/{id}/delete"
    DELETE: Delete message by id

  - "/features"
    GET: Get all features
    POST: Create a new feature

  - "/features/{id}""
    GET: Get feature by id
    PUT: Update feature by id
    DELETE: Delete feature by id
*/

const express = require('express')
const verifyAuth = require('./authentifizierung')

const router = express.Router()

router.put('/users/:id/lock', verifyAuth, (req, res) => {
    // called when PUT /api/admin/users/:id/lock
})

router.put('/users/:id/unlock', verifyAuth, (req, res) => {
    // called when PUT /api/admin/users/:id/unlock
})

router.delete('/messages/:id/delete', verifyAuth, (req, res) => {
    // called when DELETE /api/admin/messages/:id/delete
})

router.get('/features', verifyAuth, (req, res) => {
    // called when GET /api/admin/features
})

router.post('/features', verifyAuth, (req, res) => {
    // called when POST /api/admin/features
})

router.get('/features/:id', verifyAuth, (req, res) => {
    // called when GET /api/admin/features/:id
})

router.put('/features/:id', verifyAuth, (req, res) => {
    // called when PUT /api/admin/features/:id
})

router.delete('/features/:id', verifyAuth, (req, res) => {
    // called when DELETE /api/admin/features/:id
})

module.exports = router
