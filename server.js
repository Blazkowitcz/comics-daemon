const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes/library.route")(app);

app.listen(3000, function () {});
