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

    let insertResult = null

    try {
        insertResult = await executeQuery(
            "INSERT INTO `reservations` (`reservationId`, `creationDate`, `reservationDate`, `ownerId`, `reservingId`, `dogId`, `status`, `isActive`) VALUES (NULL, NOW(), NULL, ?, NULL, ?, 'created', 0);",
            [userId, dogId]
        )
    } catch (e) {
        res.status(500).send(e)
        return
    }

    const { insertId } = insertResult

    await recordEvent({
        eventType: 'new-reservation',
        dogId,
        breederId: userId,
    })

    res.send({ reservationId: insertId })
})

router.put('/API/update-offer-description', async (req, res, next) => {
    const { shortDescription, description, reservationId } = req.body
    //TODO validation if user is owner of dog
    try {
        await executeQuery(
            'UPDATE `reservations` SET `shortDescription` = ?, `description` = ? WHERE `reservations`.`reservationId` = ?;',
            [shortDescription, description, reservationId]
        )

        res.send({ message: 'ok' })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.put('/API/activate-offer', async (req, res, next) => {
    const { reservationId } = req.body

    //TODO validation if user is owner of dog
    try {
        await executeQuery(
            'UPDATE `reservations` SET `isActive` = 1 WHERE `reservations`.`reservationId` = ?;',
            [reservationId]
        )

        res.send({ message: 'ok' })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
