const mysql = require('mysql');

const getConnection = () => {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'doggo'
    });

    return con;
};

module.exports = {
    getConnection
}