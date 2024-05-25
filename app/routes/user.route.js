const express = require( 'express' );
const { createUserController, deleteUserController,
 findAllUsersController, findUserController,
 loginUserController,  updateUserController }  = require("../controller/user.controller");

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
    .post(cpUpload, createUserController)
    .get(findAllUsersController)

router
    .route("/login")
    .post(loginUserController);

router
    .route("/:userId")
    .get(findUserController)
    .put(cpUpload, updateUserController)
    .delete(deleteUserController);

    module.exports= router;