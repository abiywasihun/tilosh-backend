require( 'dotenv' ).config();
const { connectDB, sequelize } = require("./config/db");

const config = require( './config/config' ).getConfig(),
    PORT = config.PORT;

console.log( ' Starting Application' );
console.log( ` Mode: ${config.MODE}` );
console.log( ` Port: ${PORT}` );
const { server } = require( './config/server' );

server.listen( PORT ).on( 'error', ( err ) => {
    console.log( 'Application failed to start' );
    console.error( err.message );
    process.exit( 0 );
} ).on( 'listening', async() => {
    console.log( ' Application Started' );
    await connectDB();
    sequelize.sync({ force: true }).then(() => {
        console.log("Database Connected Successfully");
    });
} );


module.exports = { server };

