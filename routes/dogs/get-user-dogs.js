const express = require('express')
const {authorizeUser} = require("../../utils/authorization-utils");
const {executeQuery} = require("../../utils/database-utils");
const router = express.Router()

router.get('/API/get-user-dogs', authorizeUser,  async (req, res, next) => {
    const { userId } = req.signedCookies

    const dogs = await executeQuery(`
    SELECT dogs.*, breeding.*, reservations.reservationDate, reservations.creationDate, reservations.status , reservations.reservationId 
    FROM dogs 
    LEFT JOIN breeding ON breeding.breedingId = dogs.breeding
    LEFT JOIN reservations ON reservations.dogId = dogs.dogId WHERE owner = ?
    `, [userId])

    res.send(dogs)
})

module.exports = router
