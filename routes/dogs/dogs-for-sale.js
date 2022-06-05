const express = require('express')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.get('/dogs/for-sale', (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

module.exports = router
