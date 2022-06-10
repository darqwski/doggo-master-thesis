const express = require('express')
const { executeQuery } = require('../../utils/database-utils')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()

router.get('/API/user', async (req, res, next) => {
    const { userId } = req.signedCookies

    if (!userId) {
        return res.status(401)
    }

    const result =await executeQuery(
        'SELECT userId, firstName, lastName, email, login FROM users WHERE userId = ?',
        [userId]
    )

    console.log(result)

    res.send(result[0])
})

module.exports = router
