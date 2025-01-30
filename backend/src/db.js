const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soulconnect',
    connectionLimit: 15,
});

module.exports = pool;
