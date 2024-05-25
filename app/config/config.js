// module.exports = {
//   url: "mongodb+srv://abiywasihun:Abiy21@cluster0.0kewasi.mongodb.net/?retryWrites=true&w=majority"
// };
'use strict';
const path = require( 'path' );

module.exports.getConfig = () => {
    const config = {
        'MODE': process.env.NODE_ENV || 'development',
        'PORT': process.env.PORT || 9092,
        'POSTGRES_URL': process.env.DATABASE_URL || "postgresql://postgres:postgres@1234@localhost:5432/tilosh?schema=public",
    };

    return config;
};