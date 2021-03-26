const express = require('express');
const app = express();

require("./app/routes/library.route")(app);

app.listen(3000, function () {});
