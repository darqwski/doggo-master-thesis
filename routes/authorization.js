const express = require('express');
const router = express.Router();
const md5 = require('md5');
const { provideFrontendData } = require("../utils/provide-frontend-data");
const { getConnection } = require("../utils/database-utils");

router.post('/login', (req, res) => {
    const { login, password } = req.body;

    const con = getConnection();
    con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM users WHERE login="${login}" AND password=MD5("${password}")`,  (err, result) => {
            if (err) throw err;
            if(result.length===1){
                // if( !result[0].isActive ){
                //     res.send(JSON.stringify({ message: 'Użytkownik jest zablokowany.' }));
                //     return;
                // }
                res.cookie('user', login, { signed: true });
                res.cookie('userId', result[0].userId, { signed: true });
                res.cookie('login',login);
                res.cookie('permissionSecret',result[0].type, { signed: true });
                res.cookie('permission',result[0].type);
                res.redirect('/dashboard')
            } else {
                res.render('index', provideFrontendData(req,{ loginFailed: "Niepoprawny użytkownik lub hasło" }));
            }
        });
    });
});

router.get('/login', (req, res) => {
    res.render('index', provideFrontendData(req));
})
router.get('/logout', (req, res) => {
    res.cookie('user', '', { maxAge: -1 });
    res.cookie('login', '', { maxAge: -1 });
    res.cookie('permission', '', { maxAge: -1 });

    res.redirect('/');
})

module.exports = router;
