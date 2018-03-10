/**
    @file Routes from individual controllers are consolidated here
    router.use('/controllerName', require(./controllerName))
    Controllers should not make any data requests from an api or a database.
        - That should be in a model
*/
const express = require('express');

const router = express.Router();

router.use('/example', require('./exampleController'));

/** Routes can be defined here, but ideally they would be inside of controllers */
router.get('/', (req, res) => {
    console.log('root path');
    res.json({ response: 'Backend server' });
});

module.exports = router;
