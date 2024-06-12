/*
  AUTHOR:               Robin Trachsel
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

const express = require('express');
const verifyAuth = require('./authentification');
const verifyAdmin = require('./authentification');

const sqlQuery = require("./mysql/database");

const { User, Messages } = require("../Database/mongodb/models");

const router = express.Router();


async function lockUser(id) {
    /* MySQL
    const SQL = `UPDATE \`Users\` SET locked = true WHERE ID = ${id}`
    await sqlQuery(SQL)
    */
    let entity = await User.findOne({
        ID: id
    });
    if (entity) {
        entity = await User.updateOne(
            { ID: id },
            { $set: { locked: true } }
        );
    } else {
        throw Error("User doesn't exist!");
    }
}

async function unlockUser(id) {
    /* MySQL
    const SQL = `UPDATE \`Users\` SET locked = false WHERE ID = ${id}`
    await sqlQuery(SQL)
    */
    let entity = await User.findOne({
        ID: id
    });
    if (entity) {
        entity = await User.updateOne(
            { ID: id },
            { $set: { locked: false } }
        );
    } else {
        throw Error("User doesn't exist!");
    }
}

async function deleteMessage(id) {
    /* MySQL
    const SQL = `DELETE FROM \`Messages\` WHERE ID = ${id}`
    await sqlQuery(SQL)
    */
    const result = await Messages.deleteOne({
        ID: id
    });
    if (result.deletedCount === 0) {
        throw Error("Message doesn't exist!");
    }
}

router.put('/users/:id/lock', verifyAuth, verifyAdmin, (req, res) => {
    // called when PUT /api/admin/users/:id/lock
    lockUser(req.params.id)

    res.status(200).send({ message: 'User locked' })
})

router.put('/users/:id/unlock', verifyAuth, verifyAdmin, (req, res) => {
    // called when PUT /api/admin/users/:id/unlock
    unlockUser(req.params.id)

    res.status(200).send({ message: 'User unlocked' })
})

router.delete('/messages/:id/delete', verifyAuth, verifyAdmin, (req, res) => {
    // called when DELETE /api/admin/messages/:id/delete
    deleteMessage(req.params.id)

    res.status(200).send({ message: 'Message deleted' })
})

router.get('/features', verifyAuth, verifyAdmin, (req, res) => {
    // called when GET /api/admin/features
})

router.post('/features', verifyAuth, verifyAdmin, (req, res) => {
    // called when POST /api/admin/features
})

router.get('/features/:id', verifyAuth, verifyAdmin, (req, res) => {
    // called when GET /api/admin/features/:id
})

router.put('/features/:id', verifyAuth, verifyAdmin, (req, res) => {
    // called when PUT /api/admin/features/:id
})

router.delete('/features/:id', verifyAuth, verifyAdmin, (req, res) => {
    // called when DELETE /api/admin/features/:id
})

module.exports = router
