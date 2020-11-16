import { createRequire } from 'module';
const require = createRequire(import.meta.url)
import multer from "multer";
import express from 'express';
import { isAuth, isAdmin } from '../utils.js';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config.js'
import sharp from 'sharp';
import fs from 'fs'


const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, res, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        //  file.originalname points to the real name of image,
        //  file.fieldname = name of input form field.
        cb(null, file.originalname.split('.')[0] + '-' + `${Date.now()}.jpg`);
    }
})
// We can access this filename using req.file.filename
//  Creating upload middleware max file size is passed in bytes 400KB = 4,00,000bytes.
const upload = multer({ storage: storage, limits: { fileSize: 400000 } });

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    if (req.file) {
        sharp(req.file.path)
            .resize(225, 225, {
                fit: "contain",
                background: { r: 255, g: 255, b: 355, }
            })
            .toFile(`uploads/sharp/${req.file.filename}`, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(`/uploads/sharp/${req.file.filename}`);
                    fs.unlinkSync(req.file.path) /* unlink method we use to delete previous file */
                }
            })
    }


});

aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
})

const s3 = new aws.S3();
const storageS3 = multerS3({
    s3,
    bucket: 'my-amazona-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
        cb(null, file.originalname);
    }
})

const uploadS3 = multer({ storage: storageS3 });
uploadRouter.post('/s3', uploadS3.single('image'), (req, res) => {
    res.send(config.sharpPath + req.file.originalname);
    // res.send(req.file.location);
})


export default uploadRouter;