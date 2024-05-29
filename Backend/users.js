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
const verifyAuth = require('./authentification')

const router = express.Router()

router.get('', (req, res) => {
	// called when GET /api/users
	const result = getAllUsers()

	res.status(200).json(result)
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

async function getAllUsers() {
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
				GROUP BY Users.ID;
`

	const result = await sqlQuery(SQL)

	return result
}

module.exports = router;