/**
    @module ExampleController
    @exports ExampleController
    @file Example controller code
        Uses ExampleModel
*/
const express = require('express');

const router = express.Router();

const example = require('../models/exampleModel');

/**
    Creates a route for /exampleController
    @returns {object} @see {@link ExampleModel}
*/
router.get('/', async (req, res) => {
    res.json({ response: await example.get() });
});

module.exports = router;
