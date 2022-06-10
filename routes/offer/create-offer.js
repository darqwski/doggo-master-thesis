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
            "INSERT INTO `offers` (`offerId`, `creationDate`, `buyDate`, `ownerId`, `reservingId`, `dogId`, `status`, `isActive`) VALUES (NULL, NOW(), NULL, ?, NULL, ?, 'created', 0);",
            [userId, dogId]
        )
    } catch (e) {
        res.status(500).send(e)
        return
    }

    const { insertId } = insertResult

    await recordEvent({
        eventType: 'new-offer',
        dogId,
        breederId: userId,
    })

    res.send({ offerId: insertId })
})

router.put('/API/update-offer-description', async (req, res, next) => {
    const { shortDescription, description, offerId } = req.body
    //TODO validation if user is owner of dog
    try {
        await executeQuery(
            'UPDATE `offers` SET `shortDescription` = ?, `description` = ? WHERE `offers`.`offerId` = ?;',
            [shortDescription, description, offerId]
        )

        res.send({ message: 'ok' })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
