const express = require('express')
const {executeQuery} = require("../../utils/database-utils");
const router = express.Router()

router.put('/API/activate-offer', async (req, res, next) => {
    const { offerId } = req.body

    //TODO validation if user is owner of dog
    try {
        await executeQuery(
            'UPDATE `offers` SET `isActive` = 1 WHERE `offers`.`offerId` = ?;',
            [offerId]
        )

        res.send({ message: 'ok' })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.put('/API/deactivate-offer', async (req, res, next) => {
    const { offerId } = req.body

    //TODO validation if user is owner of dog
    try {
        await executeQuery(
            'UPDATE `offers` SET `isActive` = 1 WHERE `offers`.`offerId` = ?;',
            [offerId]
        )

        res.send({ message: 'ok' })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
