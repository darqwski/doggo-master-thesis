const express = require('express')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.get('/dogs/create-offer', (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

module.exports = router
