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
    Get commute data for a list for zipodes or map coordinates
    @returns {object} @see {@link CommuteModel}
*/
router.get('/', async (req, res) => {
    // req.query will contain query string parameters
    //      i.e. /commute?zipCode=21009 will populate req.query.zipCode with '21009'
    //           req.params.zipCode will contains '21009' since it is a part of our route parameters
    //
    //           /commute?smallestLat=39.50565195608165&smallestLng=-76.44096927896987&largestLat=39.57184407992466&largestLng=-76.28149585978042
    //           the four req parameters will contain the speficied values   
    //      
    // you can also lookup multiple zipcodes
    //      i.e. /commute?zipCode=21009&zipCode=21010&zipCode=21011
    //
    //  But you currntly cannot specify both zipcodes and map coordinates (must be one or the other)
    //
    try {
        res.json({ response: await commuteModel.getAll(req.query.zipCode,req.query.smallestLat,req.query.smallestLng,req.query.largestLat, req.query.largestLng) });
    } catch (err) {
        console.log(`${err.message}`);
        res.sendStatus(422);
    }
});

/**
    Get specific
    @returns {object} @see {@link CommuteModel}
*/
router.get('/:zipCode', async (req, res) => {
    // req.params will contain the given id
    // req.query will contain query string parameters
    // i.e. /commute/21009 will populate req.params with '21009'
    // req.params.id will contain '21009'
    try {
        res.json({ response: await commuteModel.get(req.params.zipCode) });
    } catch (err) {
        console.log(`${err.message}`);
        res.sendStatus(422);
    }
});


module.exports = router;

