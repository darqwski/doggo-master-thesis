const express = require('express')
const {authorizeAdmin} = require("../utils/authorization-utils");
const { executeQuery } = require('../utils/database-utils')
const { provideFrontendData } = require('../utils/provide-frontend-data')
const router = express.Router()

router.get('/admin', authorizeAdmin, async (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

module.exports = router
