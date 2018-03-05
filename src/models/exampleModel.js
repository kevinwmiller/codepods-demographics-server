const axios = require('axios')

// Models handle calls to the database or to fetch data from APIs
// This model fetches the google homepage
exports.get = async function() {
	try {
		const response = await axios.get('http://www.google.com')
		return response.data
	} catch (err) {
		return "Error retrieving web data"
	}
}
