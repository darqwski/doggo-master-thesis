const express = require('express')
const { recordEvent } = require('../../utils/event-utils')
const { executeQuery } = require('../../utils/database-utils')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.get('/dogs/create-offer', (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

router.post('/API/create-offer', async (req, res, next) => {
    const { dogId } = req.body
    const { userId } = req.signedCookies

    if (!userId || !dogId) {
        res.status(400).send({ userId, dogId })
        return
    }
    try {
        await executeQuery(
            "INSERT INTO `reservations` (`reservationId`, `creationDate`, `reservationDate`, `ownerId`, `reservingId`, `dogId`, `status`) VALUES (NULL, NOW(), NULL, ?, NULL, ?, 'created');",
            [userId, dogId]
        )
    } catch (e) {
        res.status(500).send(e)
        return
    }

    await recordEvent({
        eventType: 'new-reservation',
        dogId,
        breederId: userId,
    })
})

module.exports = router
