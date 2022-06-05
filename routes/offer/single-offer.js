const express = require('express')
const { executeQuery } = require('../../utils/database-utils')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.get('/reservation/edit/:reservationId', (req, res, next) => {
    res.render(
        'index',
        provideFrontendData(req, { reservationId: req.params.reservationId })
    )
})

router.get('/reservation/:reservationId', (req, res, next) => {
    res.render(
        'index',
        provideFrontendData(req, { reservationId: req.params.reservationId })
    )
})

router.get('/API/reservation/:reservationId', async (req, res, next) => {
    const { reservationId } = req.params

    const result = await executeQuery(
        `
    SELECT 
       reservations.creationDate as reservationCreationDate, 
       reservations.status as reservationStatus, 
       reservations.description as reservationDescription, 
       reservations.shortDescription as reservationShortDescription, 
       reservations.price as reservationPrice,

       dogs.birth as dogBirth,
       dogs.dogName as dogName,
       dogs.race as dogRace,
       dogs.profileImage as dogProfileImage,

       owners.login as ownerLogin,

       breeding.name as breedingName,
       breeding.address as breedingAddress
    FROM reservations 
    INNER JOIN dogs on reservations.dogId = dogs.dogId 
    INNER JOIN breeding on breeding.breedingId = dogs.breeding 
    INNER JOIN users owners ON reservations.ownerId = owners.userId 
    WHERE reservationId = ?`,
        [reservationId]
    )

    if (result.length !== 1) {
        res.status(500).send('No reservation')
    }

    const [reservation] = result

    const {
        reservationCreationDate,
        reservationStatus,
        reservationPrice,
        reservationShortDescription,
        reservationDescription,
        dogBirth,
        dogName,
        dogRace,
        dogProfileImage,
        ownerLogin,
        breedingName,
        breedingAddress,
    } = reservation

    res.send({
        reservation: {
            price: reservationPrice,
            status: reservationStatus,
            description: reservationDescription,
            shortDescription: reservationShortDescription,
            creationDate: reservationCreationDate,
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

router.put('/API/reservation/:reservationId', async (req, res, next) => {
    const { shortDescription, description, price } = req.body
    const { reservationId } = req.params

    try {
        await executeQuery(
            'UPDATE `reservations` SET `shortDescription` = ?, `description` = ?, `price` = ? WHERE `reservations`.`reservationId` = ?;',
            [shortDescription, description, price, reservationId]
        )
    } catch (e) {
        res.status(500).send({ message: 'something goes wrong' })
    }
})

module.exports = router
