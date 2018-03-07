/**
    @file Entry point for the express server
        Define middleware here
*/
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Include routes from controllers. Don't define routes in this main index.js file
app.use(require('./src/controllers'));

app.listen(port, () => console.log(`Listening on port ${port}`));
