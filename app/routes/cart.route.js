const express = require( 'express' );
const { createCartController,findCartController, 
findCartByUserController, findAllCartsController,
updateCartController,deleteCartController }  = require("../controller/cart.controller");


const router = express.Router();


router
    .route("/")
    .post(createCartController)
    .get(findAllCartsController)


router
    .route("/user")
    .post(findCartByUserController);

router
    .route("/:userId")
    .get(findCartController)
    .put(updateCartController)
    .delete(deleteCartController);

    module.exports= router;