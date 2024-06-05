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
const verifyAdmin = require("./authentification");
const sha256 = require("./authentification");

const { User } = require("./db/models");

const router = express.Router()


async function registerUser(firstname, lastname, email, passwordHash, address, gender, hobbies) {
    try {
        const defaultSubscription = {
            name: "Free",
            price: 0
        };

        const defaultPayment = {
            fullname: "",
            iban: "",
            bic: ""
        };

        if (!firstname || !lastname || !email || !passwordHash || !address || !gender || !hobbies) {
            throw new Error("Missing required user data.");
        }

        const userRole = "user";
        const userSubscription = defaultSubscription;
        const userPayment = defaultPayment;

        const mergedUserData = {
            ...userData,
            role: userRole,
            subscription: userSubscription,
            payment: userPayment,
			notifications: []
        };

        const newUser = await User.create(mergedUserData);
        console.log("User registered successfully:", newUser);

        return newUser;
    } catch (error) {
        console.error("Error registering user:", error.message);
        throw error;
    }
}

router.get('/', async (req, res) => { // TODO: Discuss if admin only
	// called when GET /api/users
	const allUsers = await User.find({});
	return res.status(200).send(allUsers);
})

router.post('/', async (req, res) => {
	// called when POST /api/users
	const { firstname, lastname, email, password, address, gender, hobbies } = req.body;
	
	const isEmailUsed = User.findOne({
		email: email
	});

	if (isEmailUsed) {
		return res.status(400).send("Email is already used!");
	}

	// TODO: Data Validation

	password = sha256(password);

	try {
		const newUser = await registerUser(firstname, lastname, email, password, address, gender, hobbies)
		
		if (newUser) {
			const data = {
				id: newUser.ID,
				email: newUser.email,
				role: newUser.role
			}
			return res.status(200).send(data);
		} else {
			return res.status(500).send("An error occurd while registering the user.");
		}
	} catch(error) {
		console.warn(error);
		return res.status(500).send("An error occurd while registering the user.");
	}
})

router.get('/:id', async (req, res) => {
	// called when GET /api/users/:id
	const id = req.params.id;
	console.log(id)

	const entity = await User.findOne({
		ID: id
	});

	if (!entity) {
		return res.status(404).send({ message: "An invalid id has been given."});
	}

	const data = {
		firstname: entity.firstname,
		lastname: entity.lastname,
		email: entity.email,
		role: entity.role,
	};
	
	return res.status(200).send(data);
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

module.exports = router;