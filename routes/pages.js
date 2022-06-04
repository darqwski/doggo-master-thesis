const {provideFrontendData} = require("../utils/provide-frontend-data");

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', provideFrontendData(req));
});

module.exports = router;
