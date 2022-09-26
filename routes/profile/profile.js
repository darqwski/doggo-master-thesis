const {provideFrontendData} = require("../../utils/provide-frontend-data");
const { executeQuery } = require('../../utils/database-utils')
const express = require('express');
const router = express.Router();

/* GET profile page. */
router.get('/profile/breeder/:breederId', function(req, res, next) {
    const { breederId } = req.params

    res.render('index', provideFrontendData(req, { breederId }));
});

/* GET profile page. */
router.get('/profile/user/:userId', function(req, res, next) {
    const { userId } = req.params

    res.render('index', provideFrontendData(req, { userId }));
});

router.get('/API/profile/user/:userId', async (req, res, next) => {
    const { userId } = req.params;

    const [matchingUser] =await executeQuery('SELECT * FROM users WHERE userId = ?', [userId])

    if(!matchingUser){
        return res.status(404).send('User does not exist')
    }

    delete matchingUser.password

    if(matchingUser.type === 'breeder'){
        const matchingBreedings = await executeQuery('SELECT * FROM breeding WHERE breederId = ?', [userId])
        matchingUser.breedings = matchingBreedings;
    }

    if(matchingUser.type === 'breeder' || matchingUser.type === 'client'){
        const matchingDogs = await executeQuery('SELECT * FROM dogs WHERE owner = ?', [userId])
        matchingUser.dogs = matchingDogs;

        const matchingOpinions = await executeQuery('SELECT * FROM opinions WHERE opinionReceiver = ?', [userId]);
        matchingUser.opinions = matchingOpinions;
    }

    return res.send(matchingUser)


});

module.exports = router;
