const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/get', async (req, res) => {
    try {
        //const results = await query('select * FROM Payment'); //TODO: Use Mongodb
        res.status(200).json(results);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /matches/add
router.post('/add', async (req, res) => {
    const { prename, name, iban, bic } = req.body;

    if (!prename || !name || !iban || !bic) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO Payment (prename, name, iban, bic) VALUES (?, ?, ?, ?)';
    const params = [prename, name, iban, bic];

    try {
        //const result = await query(sql, params); //TODO: USE MONGODB
        res.status(201).json({ message: 'Payment information added successfully', id: result.insertId });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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