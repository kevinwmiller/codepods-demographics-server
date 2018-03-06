/**
	@exports ExampleModel
	@file Models handle calls to the database or to fetch data from APIs

	@typedef {Object} ExampleJsonObject
	@property {string} First The person's first name
	@property {string} Last The person's last name

 */
const axios = require('axios')

/**
	The model would make an api request using axios or a database request if no api is available
	@returns {ExampleJsonObject} Example Pprson data
*/
exports.get = async function() {
	console.log("get")
	return {"firstName": "First", "lastName": "Last"}
}
