const express = require( 'express' );
const { createProductController,findProductController, 
findAllProductsController,updateProductController,
deleteProductController, findProductByCategoryController,
findProductByUserController }  = require("../controller/product.controller");

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
    .post(cpUpload, createProductController)
    .get(findAllProductsController)

router
    .route("/user")
    .post(findProductByUserController);

router
    .route("/category")
    .post(findProductByCategoryController);

router
    .route("/:userId")
    .get(findProductController)
    .put(cpUpload, updateProductController)
    .delete(deleteProductController);

    module.exports= router;