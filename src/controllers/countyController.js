/**
    @module County
    @exports County
    @file County controller code
        Uses IncomeModel
*/

const express = require('express') ;
const router = express.Router() ;
const countyModel = require('../models/countyModel') ;


/**
    Get income data for given area
    @returns {object} @see {@link IncomeModel}
*/
router.get('/' , async (req , res) => {
    try {
        console.log(req.query.border);
        res.json({ response: await countyModel.get(req.query.border)});
    } catch (err) {
        console.log(`${err.message}`) ;
        res.sendStatus(422) ;
    }
});


module.exports = router ;
