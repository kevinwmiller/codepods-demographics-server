/**
    @module Example
    @exports Example
    @file Example controller code
        Uses ExampleModel
*/
const express = require('express');

const router = express.Router();

const exampleModel = require('../models/exampleModel');

/**
    Creates a post route for /example/create
    @returns {object} @see {@link ExampleModel}
*/
router.post('/create', async (req, res) => {
    try {
        res.json({ response: await exampleModel.create(req.body.firstName, req.body.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});


/**
    Creates a get route for /example/read
    @returns {object} @see {@link ExampleModel}
*/
router.get('/read', async (req, res) => {
    // req.query will contain query string parameters
    // i.e. /example/read?firstName=John&lastName=Doe will populate req.query.firstName with 'John'
    // and req.query.lastName with 'Doe'
    // req.params.firstName will contains 'John' since it is a part of our route parameters
    try {
        res.json({ response: await exampleModel.read(req.query.firstName, req.query.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Creates a post route for /example/update
    @returns {object} @see {@link ExampleModel}
*/
router.post('/update', async (req, res) => {
    // req.body will contains key/value pairs contained in the page body.
    // Usually only needed when a post request is received
    try {
        res.json({ response: await exampleModel.update(req.body.firstName, req.body.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Creates a post route for /example/delete
    @returns {object} @see {@link ExampleModel}
*/
router.post('/delete', async (req, res) => {
    try {
        res.json({ response: await exampleModel.delete(req.body.firstName, req.body.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});


module.exports = router;
