const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require('cors');
const helmet = require( 'helmet' ),
    server = express();
const { setRoutes } = require( './routes' );
// For security

server.use( helmet({
      crossOriginResourcePolicy: false,
    }));


server.use(cors())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// server.use( cors( corsOptions ) );

server.use( bodyParser.json() );

// Setting up Routes
setRoutes( server );

module.exports = { server };