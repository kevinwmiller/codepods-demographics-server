/**
	@exports models/exampleModel
	@module ExampleModel
	@file Models handle calls to the database or to fetch data from APIs
*/
const axios = require('axios')

/**
	Makes a get request to google.com to fetch the home page contents
	@returns {string} The html of the home page of google.com on success
		or an error message on failure
*/
exports.get = async function() {
	try {
		const response = await axios.get('http://www.google.com')
		return response.data
	} catch (err) {
		return "Error retrieving web data"
	}
}
