/*
  AUTHOR:               Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          JS-Server: Endpoints for /matches

  Endpoints:
  - "/"
    GET: Get all matches
    POST: Create a new match
*/

const MYSQL = require('mysql');

const credentials = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bfriend_database'
}

async function query(SQL) {
    return new Promise((resolve, reject) => {
        const CONNECTION = MYSQL.createConnection(
            credentials
        );

        CONNECTION.connect();

        CONNECTION.query(SQL, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });

        CONNECTION.end();
    });
}

module.exports = query
