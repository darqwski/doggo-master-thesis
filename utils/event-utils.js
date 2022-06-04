const { executeQuery } = require('./database-utils');

const recordEvent = async ({ eventType, breederId, ownerId, dogId }) => {
    if(!eventType){
        throw 'Missing event type'
    }
    await executeQuery('INSERT INTO `events` (`eventId`, `eventType`, `breederId`, `ownerId`, `dogId`, `eventTime`) VALUES (NULL, ?, ?, ?, ?, NOW());',[
        eventType, breederId ?? null, ownerId ?? null, dogId ?? null
    ])
}

module.exports = {
    recordEvent
}