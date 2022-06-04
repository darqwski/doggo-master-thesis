const express = require('express');
const md5 = require('md5');
const {getConnection} = require("../utils/database-utils");
const {provideFrontendData} = require("../utils/provide-frontend-data");

const router = express.Router();

router.post('/API/register',(req,res)=>{
    const { login, password, type, email } = req.body;
    const con = getConnection();
    con.query('SELECT * FROM users WHERE login = ?',[login],(err, result)=>{
        if (err) {
            res.status(500).send(JSON.stringify({ error: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
        } else {
            if(result.length === 0) {
                const sqlCommand = `
	INSERT INTO users (userId, login, password, email, type) VALUES (NULL, ?, '${md5(password)}', ?, ?);
`;
                con.query(sqlCommand,[login, email, type], function (err) {
                    if (err) {
                        console.log(err)
                        res.status(500).send(JSON.stringify({ error: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
                    } else {
                        res.send(JSON.stringify({ message: 'Zarejestrowano pomyślnie' }));
                    }
                });
            } else {
                res.send(JSON.stringify({ error: 'Login już zajęty, proszę sprobowac inny' }));
            }
        }
    });
});
router.get('/register', function(req, res, next) {
    res.render('index', provideFrontendData(req));
});

module.exports = router;