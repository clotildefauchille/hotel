import mysql from 'mysql2/promise';

const connexion = mysql.createPool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    host: 'localhost',
    user: 'hotel',
    password: 'hotel',
    database: 'hotel',
});

export default connexion;