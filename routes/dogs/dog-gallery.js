const express = require('express')
const multer = require('multer')
const path = require("path");
const { provideFrontendData } = require('../../utils/provide-frontend-data')
const router = express.Router()
const crypto = require('crypto');
const fs = require('fs');
const {executeQuery} = require("../../utils/database-utils");


router.get('/photo-test',(req,res,next)=>{
    res.sendFile(process.cwd() + '/userdata/test.jpg')
})

router.post('/API/dog/:dogId/add-photo', (req, res, next) => {
    const { dogId } = req.params
    const { userId } = req.signedCookies
    const directory = 'userdata/dogs/'+dogId+'/'
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory)
        },
        filename: function (req, file, cb) {
            const hash = crypto.createHash('md5').update(file.fieldname+`${(new Date().getTime())}`).digest('hex');

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
            const { destination, filename, size, path } =req.file
            const { insertId } = await executeQuery(
                `INSERT INTO uploaded_files (fileId, fileUrl, fileDir, fileName, ownerId, size) VALUES ( NULL, ?, ? ,? , ? , ? )`,
                [path, destination, filename, userId, size ]
            )

            await executeQuery(
                `INSERT INTO dog_images (dogImageId, dogId, imageId) VALUES ( NULL, ?, ?)`,
                [dogId, insertId ]
            )

            res.send({message: 'Success, Image uploaded!'})
        }
    })
})

router.get('/dog/:dogId/edit', (req, res, next) => {
    res.render('index', provideFrontendData(req))
})

module.exports = router
