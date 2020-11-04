const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

app = express();

// Middlewares
app.use(cors())
app.use(bodyParser.json())

// API requests go to router
const api = require('./api')
app.use('/api', api)

app.get('/', function (req, res) {
    res.send("<h1>Documentation</h1>")
});

const port = process.env.PORT;
app.listen(port);
console.log(`Running v${process.env.PROJECT_VERSION} on port ${port}`)
