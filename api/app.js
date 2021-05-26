const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require('./mongo/mongo');

const app = express();
mongodb.initClientDbConnection();

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to unkle api." });
});
require('./routes/auth.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/user.routes')(app);


module.exports = app;
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
