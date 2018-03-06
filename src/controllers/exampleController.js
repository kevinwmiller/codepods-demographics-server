/**
	@exports controllers/exampleController
	@module ExampleController
	@file Example controller code
		Uses ExampleModel
*/
const express = require('express')
const router = express.Router()

const example = require('../models/exampleModel')

/**
	Creates a route for /exampleController
	@returns {string} html string from exampleModel
*/
router.get('/', async (req, res) => {
	res.json({ response: await example.get() })
});

module.exports = router