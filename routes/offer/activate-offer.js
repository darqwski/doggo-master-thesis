const express = require('express')
const {executeQuery} = require("../../utils/database-utils");
const router = express.Router()

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

router.put('/API/deactivate-offer', async (req, res, next) => {
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
