const express = require('express')
const {authorizeAdmin} = require("../utils/authorization-utils");
const { executeQuery } = require('../utils/database-utils')
const { provideFrontendData } = require('../utils/provide-frontend-data')
const router = express.Router()

router.get('/admin', authorizeAdmin, async (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

router.get('/API/admin/users',authorizeAdmin, async (req, res)=>{
    const usersWithDogs = await executeQuery(`
    SELECT users.login, users.userId, users.type, COUNT(offers.offerId) as dogsAmount FROM \`users\`
LEFT JOIN offers ON offers.reservingId = users.userId  AND offers.status = "paid"
GROUP BY users.userId
`);
    const usersWithReceivedOpinions = await executeQuery(`
SELECT  users.userId, users.type, COUNT(opinions.opinionId) as receivedOpinions FROM \`users\`
LEFT JOIN opinions ON opinions.opinionReceiver = users.userId  
GROUP BY opinions.opinionReceiver
`)
    const usersWithGivenOpinions = await executeQuery(`
SELECT  users.userId, users.type, COUNT(opinions.opinionId) as givenOpinions FROM \`users\`
LEFT JOIN opinions ON opinions.opinionAuthor = users.userId  
GROUP BY opinions.opinionAuthor`);

    const usersWithData = usersWithDogs.map((userWithDog)=>{

        const givenOpinionsResult = usersWithGivenOpinions.find(user=>user.userId === userWithDog.userId)
        const receivedOpinionsResult = usersWithReceivedOpinions.find(user=>user.userId === userWithDog.userId)

        return {
            ...userWithDog,
            givenOpinions: givenOpinionsResult?.givenOpinions || 0,
            receivedOpinions: receivedOpinionsResult?.receivedOpinions || 0
        }
    })

    res.send(usersWithData)
})

module.exports = router
