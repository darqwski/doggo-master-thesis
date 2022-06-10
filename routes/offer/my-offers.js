const express = require('express')
const {executeQuery} = require("../../utils/database-utils");
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.get('/my-offers', (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

router.get('/API/my-offers', async  (req, res, next) => {
    const { userId } = req.signedCookies

    const offers = await  executeQuery('SELECT offers.*, dogs.* FROM `offers` INNER JOIN dogs ON dogs.dogId = offers.dogId WHERE ownerId = ?',[userId])

    res.send(offers)
})

module.exports = router
