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
    Get commute data for a list for EITHER zipcodes OR map border coordinates
    @returns {object} @see {@link CommuteModel}
*/
router.get('/', async (req, res) => {
    try {
        res.json({ response: await commuteModel.get(req.query.zipCode, req.query.border, req.query.state, req.query.county, req.query.optionKML) });
    } catch (err) {
        console.log(`${err.message}`);
        res.sendStatus(422);
    }
});

module.exports = router;

