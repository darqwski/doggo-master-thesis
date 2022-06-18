const express = require('express')
const multer = require('multer')
const path = require('path')
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()
const crypto = require('crypto')
const fs = require('fs')
const { executeQuery } = require('../../utils/database-utils')

router.get('/dog-images/:dogId/:fileName', (req, res, next) => {
    const { dogId, fileName } = req.params

    res.sendFile(process.cwd() + '/userdata/dogs/' + dogId + '/' + fileName)
});

router.get('/API/dog-info/:dogId/', async (req, res, next) => {
    const { dogId } = req.params

    const [dogInfo] = await executeQuery(`
SELECT breeding.*, users.login, dogs.*
FROM dogs
INNER JOIN breeding ON breeding.breedingId = dogs.breeding
INNER JOIN users ON users.userId = dogs.owner
WHERE dogs.dogId = ?`, [dogId]);

    res.send(dogInfo)
})

router.delete('/API/dog/remove-image/:fileId', async (req, res, next) => {
    const { fileId } = req.params
    //TODO validation if user is owner of dog
    const [image] = await executeQuery(
        `SELECT uploaded_files.fileUrl FROM uploaded_files WHERE fileId = ?`,
        [fileId]
    )
    await executeQuery(`DELETE FROM dog_images WHERE imageId = ?`, [fileId])

    await executeQuery(`DELETE FROM uploaded_files WHERE fileId = ?`, [fileId])

    fs.unlinkSync(`${process.cwd()}/${image.fileUrl}`)

    res.send({ message: 'removed successfully' })
})

router.get('/API/dog/:dogId/images', async (req, res, next) => {
    const { dogId } = req.params
    const { userId } = req.signedCookies
    if (!userId) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    const images = await executeQuery(
        `SELECT uploaded_files.fileName, uploaded_files.fileId, uploaded_files.uploadDatetime FROM dog_images 
    INNER JOIN uploaded_files on uploaded_files.fileId = dog_images.imageId
    WHERE dog_images.dogId = ?
    ORDER BY uploaded_files.uploadDatetime
    `,
        [dogId]
    )

    const imagesWithFullUrl = images.map((image) => ({
        ...image,
        fileUrl: `/dog-images/${dogId}/${image.fileName}`,
    }))

    res.send(imagesWithFullUrl)
})

router.post('/API/dog/:dogId/add-photo', (req, res, next) => {
    const { dogId } = req.params
    const { userId } = req.signedCookies
    const directory = 'userdata/dogs/' + dogId + '/'
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory)
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory)
        },
        filename: function (req, file, cb) {
            const hash = crypto
                .createHash('md5')
                .update(file.fieldname + `${new Date().getTime()}`)
                .digest('hex')

            cb(null, hash + '.jpg')
        },
    })

    const upload = multer({
        storage: storage,
        limits: { fileSize: 10 * 1000 * 1000 },
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png/
            const mimetype = filetypes.test(file.mimetype)

            const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase()
            )

            if (mimetype && extname) {
                return cb(null, true)
            }
            cb(
                'Error: File upload only supports the ' +
                    'following filetypes - ' +
                    filetypes
            )
        },
    }).single('image')

    upload(req, res, async (err) => {
        if (err) {
            res.send(err)
        } else {
            const { destination, filename, size, path } = req.file
            const { description } = req.body
            const { insertId } = await executeQuery(
                `INSERT INTO uploaded_files (fileId, fileUrl, fileDir, fileName, ownerId, size, uploadDatetime) VALUES ( NULL, ?, ? ,? , ? , ?, NOW())`,
                [path, destination, filename, userId, size]
            )

            await executeQuery(
                `INSERT INTO dog_images (dogImageId, dogId, imageId, description, creationDate) VALUES ( NULL, ?, ?, ?, NOW())`,
                [dogId, insertId, description]
            )

            res.send({ message: 'Success, Image uploaded!' })
        }
    })
})

router.get('/dog/:dogId/edit', (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

router.get('/dog/:dogId', (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

module.exports = router
