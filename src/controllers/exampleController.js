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
    Create
    @returns {object} @see {@link ExampleModel}
*/
router.post('/', async (req, res) => {
    try {
        res.json({ response: await exampleModel.create(req.body.firstName, req.body.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Get all
    @returns {object} @see {@link ExampleModel}
*/
router.get('/', async (req, res) => {
    // req.query will contain query string parameters
    // i.e. /example?firstName=John&lastName=Doe will populate req.query.firstName with 'John'
    // and req.query.lastName with 'Doe'
    // req.params.firstName will contains 'John' since it is a part of our route parameters
    try {
        res.json({ response: await exampleModel.getAll(req.query) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Get specific
    @returns {object} @see {@link ExampleModel}
*/
router.get('/:id', async (req, res) => {
    // req.params will contain the given id
    // req.query will contain query string parameters
    // i.e. /example/5aa44da6b5a3087224a8029c?firstName=John&lastName=Doe will populate req.query.firstName with 'John'
    // and req.query.lastName with 'Doe'
    // req.params.id will contain '5aa44da6b5a3087224a8029c'
    try {
        res.json({ response: await exampleModel.get(req.params.id) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Uupdate
    @returns {object} @see {@link ExampleModel}
*/
router.put('/:id', async (req, res) => {
    // req.body will contains key/value pairs contained in the page body.
    // Usually only needed when a post request is received
    try {
        res.json({ response: await exampleModel.update(req.body.firstName, req.body.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Delete
    @returns {object} @see {@link ExampleModel}
*/
router.delete('/:id', async (req, res) => {
    try {
        res.json({ response: await exampleModel.delete(req.body.firstName, req.body.lastName) });
    } catch (err) {
        res.json({ error: err.message });
    }
});


module.exports = router;
