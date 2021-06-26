const mongoose = require('mongoose');
const config = require('../../config.json');

const mongo_uri = "mongodb://" + config.mongodb.address + ':' + config.mongodb.port + '/' + config.mongodb.name;

/**
 * Database Initialisation
 */
const InitiateMongoServer = async () => {
    try{
        await mongoose.connect(mongo_uri, {
            auth: {
                user:'blazkowicz',
                password:'marley66'
            },
            authSource:"admin",
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (e){
        throw e;
    }
}

module.exports = InitiateMongoServer;