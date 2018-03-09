/**
    @module ExampleController
    @exports ExampleController
    @file Example controller code
        Uses ExampleModel
*/
const express = require('express');

const router = express.Router();

const exampleModel = require('../models/exampleModel');

/**
    Creates a route for /exampleController/create
    @returns {object} @see {@link ExampleModel}
*/
router.post('/create', async (req, res) => {
    try {
        res.json({ response: await exampleModel.create(req.query.firstName, req.query.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});


/**
    Creates a route for /exampleController/read
    @returns {object} @see {@link ExampleModel}
*/
router.get('/read', async (req, res) => {
    // req.params contains the options configured in the route itself
    // e.g. Navigating to /exampleController/John will populate req.params.firstName with 'John'

    // req.query will contains query string parameters
    // i.e. /exampleController/John?lastName=Doe will populate req.query.lastName with 'Doe'
    // req.params.firstName will contains 'John' since it is a part of our route parameters

    // req.body will contains key/value pairs contained in the page body.
    // Usually only needed when a post request is received
    try {
        res.json({ response: await exampleModel.read(req.query.firstName, req.query.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Creates a route for /exampleController/update
    @returns {object} @see {@link ExampleModel}
*/
router.post('/update', async (req, res) => {
    // req.params contains the options configured in the route itself
    // e.g. Navigating to /exampleController/John will populate req.params.firstName with 'John'

    // req.query will contains query string parameters
    // i.e. /exampleController/John?lastName=Doe will populate req.query.lastName with 'Doe'
    // req.params.firstName will contains 'John' since it is a part of our route parameters

    // req.body will contains key/value pairs contained in the page body.
    // Usually only needed when a post request is received
    try {
        res.json({ response: await exampleModel.update(req.query.firstName, req.query.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});


/**
    Creates a route for /exampleController
    @returns {object} @see {@link ExampleModel}
*/
router.post('/delete', async (req, res) => {
    try {
        res.json({ response: await exampleModel.delete(req.query.firstName, req.query.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});


module.exports = router;
