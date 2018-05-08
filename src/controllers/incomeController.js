/**
    @module Income
    @exports Income
    @file Income controller code
        Uses IncomeModel
*/

const express = require('express') ;
const router = express.Router() ;
const incomeModel = require('../models/incomeModel') ;


/**
    Get income data for given area
    @returns {object} @see {@link IncomeModel}
*/
router.get('/' , async (req , res) => {
    try {
        res.json({ response: await incomeModel.get(req.query.county)});
    } catch (err) {
        console.log(`${err.message}`) ;
        res.sendStatus(422) ;
    }
});


module.exports = router ;