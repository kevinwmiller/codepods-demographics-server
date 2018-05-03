/**
    @module Commute
    @exports Commute
    @file Commute controller code
        Uses CommuteModel
*/
const express = require('express');

const router = express.Router();

const commuteModel = require('../models/commuteModel');

/**
    Create
    @returns {object} @see {@link CommuteModel}
*/
router.post('/', async (req, res) => {
    try {
        res.json({ response: await commuteModel.create(req.body.zipCode, req.body.commuteTime) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Get all
    @returns {object} @see {@link CommuteModel}
*/
router.get('/', async (req, res) => {
    // req.query will contain query string parameters
    // i.e. /commute?firstName=John&lastName=Doe will populate req.query.firstName with 'John'
    // and req.query.lastName with 'Doe'
    // req.params.firstName will contains 'John' since it is a part of our route parameters
    try {
        res.json({ response: await commuteModel.getAll(req.query) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Get specific
    @returns {object} @see {@link CommuteModel}
*/
router.get('/:id', async (req, res) => {
    // req.params will contain the given id
    // req.query will contain query string parameters
    // i.e. /commute/5aa44da6b5a3087224a8029c?firstName=John&lastName=Doe will populate req.query.firstName with 'John'
    // and req.query.lastName with 'Doe'
    // req.params.id will contain '5aa44da6b5a3087224a8029c'
    try {
        res.json({ response: await commuteModel.get(req.params.id) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Uupdate
    @returns {object} @see {@link CommuteModel}
*/
router.patch('/:id', async (req, res) => {
    // req.body will contains key/value pairs contained in the page body.
    // Usually only needed when a post request is received
    try {
        res.json({ response: await commuteModel.update(req.body.zipCode, req.body.commuteTime) });
    } catch (err) {
        res.json({ error: err.message });
    }
});

/**
    Delete
    @returns {object} @see {@link CommuteModel}
*/
router.delete('/:id', async (req, res) => {
    try {
        res.json({ response: await commuteModel.delete(req.body.zipCode, req.body.commuteTime) });
    } catch (err) {
        res.json({ error: err.message });
    }
});


module.exports = router;
