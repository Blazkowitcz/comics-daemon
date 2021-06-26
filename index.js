const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config.json');
const app = express();
const InitiateMongoServer = require('./app/modules/database.module');

const auth = require('./app/routes/auth.route');
const library = require('./app/routes/library.route');
const collection = require('./app/routes/collection.route');
const volume = require('./app/routes/volume.route');

InitiateMongoServer();

/**
 * Express configuration
 */
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

/**
 * Check if server is started
 */
app.get("/", (req, res) => {
    res.json({ message: "Comic Reader Status : OK" });
});

/**
 * Route Definition
 */
app.use('/auth', auth);
app.use('/library', library);
app.use('/collection', collection);
app.use('/volume', volume);


/**
 * Express Start
 */
app.listen(config.port, function () {

})