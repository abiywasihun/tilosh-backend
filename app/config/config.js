// module.exports = {
//   url: "mongodb+srv://abiywasihun:Abiy21@cluster0.0kewasi.mongodb.net/?retryWrites=true&w=majority"
// };
'use strict';
const path = require( 'path' );

module.exports.getConfig = () => {
    const config = {
        'MODE': process.env.NODE_ENV,
        'PORT': process.env.PORT || 8080,
        'POSTGRES_URL': process.env.DATABASE_URL,
    };

    return config;
};