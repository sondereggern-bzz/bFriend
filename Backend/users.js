/*
  AUTHOR:               Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /users

  Endpoints:
  - "/"
	GET: Get all users
	POST: Create a new user

  - "/:id"
	GET: Get user by id
	PUT: Update user by id
	DELETE: Delete user by id

  - "/:id/deactivate"
	PUT: Deactivate user by id

  - "/:id/activate"
	PUT: Activate user by id

  - "/:id/edit"
	PUT: Edit user by id

  - "/:id/payment"
	GET: Get payment information of user by id
	PUT: Update payment information of user by id
*/

const express = require('express')
const verifyAuth = require('./authentifizierung')

const router = express.Router()

router.get('', (req, res) => {
	// called when GET /api/users
})

router.post('', (req, res) => {
	// called when POST /api/users
})

router.get('/:id', (req, res) => {
	// called when GET /api/users/:id
})

router.put('/:id', verifyAuth, (req, res) => {
	// called when PUT /api/users/:id
})

router.delete('/:id', verifyAuth, (req, res) => {
	// called when DELETE /api/users/:id
})

router.put('/:id/deactivate', verifyAuth, (req, res) => {
	// called when PUT /api/users/:id/deactivate
})

router.put('/:id/activate', verifyAuth, (req, res) => {
	// called when PUT /api/users/:id/activate
})

router.put('/:id/edit', verifyAuth, (req, res) => {
	// called when PUT /api/users/:id/edit
})

router.get('/:id/payment', verifyAuth, (req, res) => {
	// called when GET /api/users/:id/payment
})

router.put('/:id/payment', verifyAuth, (req, res) => {
	// called when PUT /api/users/:id/payment
})

module.exports = router
