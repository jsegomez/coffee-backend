const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            user: process.env.MONGOUSER,
            pass: process.env.MONGOPASS,
            dbName: process.env.MONGODATABASE,   
        });

        console.log('Conectado a la base de datos');
    } catch (error) {
        throw new Error('Error al conectase a la base de datos');
    }
}

module.exports = { dbConnection }


