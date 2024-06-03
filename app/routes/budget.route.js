const express = require( 'express' );
const { createBudgetController,findBudgetController, 
findBudgetByUserController, findAllBudgetsController,
updateBudgetController,deleteBudgetController }  = require("../controller/budget.controller");


const router = express.Router();


router
    .route("/")
    .post(createBudgetController)
    .get(findAllBudgetsController)


router
    .route("/user")
    .post(findBudgetByUserController);

router
    .route("/:userId")
    .get(findBudgetController)
    .put(updateBudgetController)
    .delete(deleteBudgetController);

    module.exports= router;