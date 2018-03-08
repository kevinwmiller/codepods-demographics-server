/**
    @file Entry point for the express server
        Define middleware here
*/
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();
const port = process.env.PORT || config.port;

app.use(cookieParser());

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// To resolve an issue when server and client are running on the same machine
app.use(cors());
// include before other routes
app.options('*', cors());

// Include routes from controllers. Don't define routes in this main index.js file
app.use(require('./src/controllers'));

app.listen(port, () => console.log(`Listening on port ${port}`));
