const express = require('express')
const router = express.Router()

const example = require('../models/exampleModel')

// Controllers should not make any data requests from an api or a database. That should be in a model
// async/await to make route asynchronous
router.get('/', async (req, res) => {
	res.json({ response: await example.get() })
});

module.exports = router