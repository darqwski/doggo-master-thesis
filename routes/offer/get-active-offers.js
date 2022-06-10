const express = require('express')
const {authorizeUser} = require("../../utils/authorization-utils");
const {executeQuery} = require("../../utils/database-utils");
const router = express.Router()

router.get('/API/get-active-offers',authorizeUser,  async (req, res, next) => {
    const { userId } = req.signedCookies

    const activeOffers = await executeQuery(`
    SELECT dogs.*, offers.creationDate, offers.status , offers.offerId,
           owners.login as ownerLogin
    FROM dogs 
    INNER JOIN offers ON offers.dogId = dogs.dogId
    INNER JOIN users owners ON owners.userId = offers.ownerId
    WHERE offers.status = 'created'
    `)

    res.send(activeOffers)
})

module.exports = router
