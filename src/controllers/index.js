const express = require('express')
const router = express.Router()

// Routes from individual controllers are consolidated here
// router.use('/controllerName', require(./controllerName))
router.use('/exampleController', require('./exampleController'))

// Routes can be defined here, but ideally they would be inside of controllers
router.get('/', function(req, res) {
	console.log("root path")
	return {response: "Backend server"}
})

module.exports = router