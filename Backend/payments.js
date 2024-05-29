const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const router = express.Router();
const query = require('./database');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bfriend_database',
});



// POST /api/payments
router.post('/add', (req, res) => {
    const { prename, name, iban, bic } = req.body;

    if (!prename || !name || !iban || !bic) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'insert into Payment (prename, name, iban, bic) VALUES (?, ?, ?, ?)';
    const params = [prename, name, iban, bic];

    pool.query(sql, params, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Payment information added successfully', id: results.insertId });
    });
});

// GET /api/payments/:name
router.get('/:name', async (req, res) => {
    const currencyName = req.params.name.toUpperCase();

    try {
        const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest`, {
            params: {
                apikey: process.env.CURRENCY_API_KEY,
                base_currency: 'CHF',
                currencies: currencyName
            }
        });

        if (response.data && response.data.data && response.data.data[currencyName]) {
            const exchangeRate = response.data.data[currencyName];
            res.status(200).json({ currency: currencyName, exchangeRate });
        } else {
            res.status(404).json({ error: 'Currency not found' });
        }
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;