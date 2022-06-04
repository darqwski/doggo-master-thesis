const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const login = 123;
  const userId = 123;
  res.render('index', { login: 123, userId: 123 });

});

module.exports = router;
