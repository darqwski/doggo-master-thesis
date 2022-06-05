const express = require('express')
const {authorizeUser} = require("../../utils/authorization-utils");
const {executeQuery} = require("../../utils/database-utils");
const router = express.Router()

router.get('/API/get-active-reservations',authorizeUser,  async (req, res, next) => {
    const { userId } = req.signedCookies

    const activeReservations = await executeQuery(`
    SELECT dogs.*, reservations.creationDate, reservations.status , reservations.reservationId,
           owners.login as ownerLogin
    FROM dogs 
    INNER JOIN reservations ON reservations.dogId = dogs.dogId
    INNER JOIN users owners ON owners.userId = reservations.ownerId
    WHERE reservations.status = 'created'
    `)

    res.send(activeReservations)
})

module.exports = router
