const express = require('express')
const { recordEvent } = require('../../utils/event-utils')
const { executeQuery } = require('../../utils/database-utils')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.post('/API/buy-dog', async (req, res, next) => {
    const { userId } = req.signedCookies
    const { offerId } = req.body

    //Check if offer is avaialble for bei

    await executeQuery(
        'UPDATE offers SET status = "pending", reservingId = ? WHERE offerId = ? AND status = "created"',
        [userId, offerId]
    )

    res.send({ message: 'process-started' })
})
router.post('/API/payment-for-dog', async (req, res, next) => {
    const { offerId } = req.body
    //AUTHORIZE PAYMENT GATEWAY!

    if(!offerId){
        res.status(400).send("Missing body")
    }
    await executeQuery(
        'UPDATE offers SET status = "paid" WHERE offerId = ? AND status = "pending"',
        [offerId]
    )

    const [updatedOffer] =await executeQuery(
        'SELECT dogId, reservingId from offers WHERE offerId = ?',
        [offerId]
    )
    await executeQuery('UPDATE dogs SET owner = ? WHERE dogId = ?', [
        updatedOffer.reservingId,
        updatedOffer.dogId,
    ])
    await recordEvent({
        eventType: 'dog-bought',
        dogId: updatedOffer.dogId,
        breederId: updatedOffer.ownerId,
        ownerId: updatedOffer.reservingId,
    })
    res.send({ message: 'process-finished' })
})

module.exports = router
