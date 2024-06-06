/*
  AUTHOR:               Robin Trachsel
  DATE:                 28.05.2024
  DESCRIPTION:          To access the database
*/

const MYSQL = require('mysql2');

const credentials = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'bfriend_database'
}

async function sqlQuery(SQL) {
    return new Promise((resolve, reject) => {
        const CONNECTION = MYSQL.createConnection(credentials);

        CONNECTION.connect();

        CONNECTION.query(SQL, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });

        CONNECTION.end();
    });
}

module.exports = sqlQuery;
