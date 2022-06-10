const express = require('express')
const { executeQuery } = require('../../utils/database-utils')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.get('/offer/edit/:offerId', (req, res, next) => {
    res.render(
        'index',
        provideFrontendData(req, { offerId: req.params.offerId })
    )
})

router.get('/offer/:offerId', (req, res, next) => {
    res.render(
        'index',
        provideFrontendData(req, { offerId: req.params.offerId })
    )
})

router.get('/API/offer/:offerId', async (req, res, next) => {
    const { offerId } = req.params

    const result = await executeQuery(
        `
    SELECT 
       offers.creationDate as offerCreationDate, 
       offers.status as offerStatus, 
       offers.description as offerDescription, 
       offers.shortDescription as offerShortDescription, 
       offers.price as offerPrice,

       dogs.birth as dogBirth,
       dogs.dogName as dogName,
       dogs.race as dogRace,
       dogs.profileImage as dogProfileImage,

       owners.login as ownerLogin,
       owners.firstName as ownerFirstName,
       owners.lastName as ownerLastName,

       breeding.name as breedingName,
       breeding.address as breedingAddress
    FROM offers 
    INNER JOIN dogs on offers.dogId = dogs.dogId 
    INNER JOIN breeding on breeding.breedingId = dogs.breeding 
    INNER JOIN users owners ON offers.ownerId = owners.userId 
    WHERE offerId = ?`,
        [offerId]
    )

    if (result.length !== 1) {
        res.status(500).send('No offer')
    }

    const [offer] = result

    const {
        offerCreationDate,
        offerStatus,
        offerPrice,
        offerShortDescription,
        offerDescription,
        dogBirth,
        dogName,
        dogRace,
        dogProfileImage,
        ownerLogin,
        ownerFirstName,
        ownerLastName,
        breedingName,
        breedingAddress,
    } = offer

    res.send({
        offer: {
            price: offerPrice,
            status: offerStatus,
            description: offerDescription,
            shortDescription: offerShortDescription,
            creationDate: offerCreationDate,
        },
        dog: {
            dogName,
            birth: dogBirth,
            race: dogRace,
            profileImage: dogProfileImage,
        },
        owner: {
            login: ownerLogin
        },
        breeding: {
            name: breedingName,
            address: breedingAddress
        }
    })
})

router.put('/API/offer/:offerId', async (req, res, next) => {
    const { shortDescription, description, price } = req.body
    const { offerId } = req.params

    try {
        await executeQuery(
            'UPDATE `offers` SET `shortDescription` = ?, `description` = ?, `price` = ? WHERE `offers`.`offerId` = ?;',
            [shortDescription, description, price, offerId]
        )
    } catch (e) {
        res.status(500).send({ message: 'something goes wrong' })
    }
})

module.exports = router
