const express = require( 'express' );
const { createPackageController,findPackageController, 
findAllPackagesController,updatePackageController,
deletePackageController, findPackageByUserController }  = require("../controller/package.controller");

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();


const DIR = './app/resources/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
const upload = multer({ storage: storage});
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'medias', maxCount: 5 }])


router
    .route("/")
    .post(cpUpload, createPackageController)
    .get(findAllPackagesController)


router
    .route("/user")
    .post(findPackageByUserController);

router
    .route("/:userId")
    .get(findPackageController)
    .put(cpUpload, updatePackageController)
    .delete(deletePackageController);

    module.exports= router;