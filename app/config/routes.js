'use strict';
const express = require( 'express' );
const path = require( 'path' );

const userRouter = require("../routes/user.route");
const productRouter = require("../routes/product.route");
const packageRouter = require("../routes/package.route");

module.exports.setRoutes = ( app ) => {

    /**
     * Application Root Route.
     * Set the Welcome message or send a static html or use a view engine.
     */
    app.get( '/', ( req, res ) => {
        res.json({ message: 'Welcome to the Tilosh API' });
    } );

    app.use('/app/resources', express.static('app/resources'))
    app.use("/api/users", userRouter);
    app.use("/api/products", productRouter);
    app.use("/api/packages", packageRouter);
    // require("../app/routes/song")(app);
    // require("../app/routes/signUp")(app);
	// require("../app/routes/signIn")(app);
};