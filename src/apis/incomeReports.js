/**
    API wrapper for chosen data.gov income source

    @exports IncomeModel
    @file Manages income data obtained from chosen income API
    
    @typedef    {Object} IncomeDetails
    @property   {string} name of the county the income applies to
    @property   {string} most recent income for the given county
*/

const axios = require('axios') ;

//const URL = 'https://data.maryland.gov/api/views/nv7y-8663';
const URL = 'https://data.maryland.gov/resource/as5f-bu5b.json';
/**
*  @class  IncomeReports (name)
*/
class IncomeReports
{
    /**
    *  Requests income data for a given county from the chosen income API from data.gov. 
    *  
    *  @param  {string}    countyName  Name of the county the annual income applies to
    *  @return {IncomeDetails[]}       List of objects containing county location and recent annual income 
    */
    async fetchIncomeData() {
        const params = {
            params: {
                year: '2015',
	    },
	};
        const response = await axios.get(URL,params);
        let incomeData = response.data;
        console.log(incomeData);
        return incomeData;
    }
    
    /**
    *  Requests income data for a given county from the chosen income API from data.gov. 
    *  
    *  @param  {string}    countyName  Name of the county the annual income applies to
    *  @return {IncomeDetails[]}       List of objects containing county location and recent annual income 
    */
    async getIncome() {
        try {
            return await this.fetchIncomeData();
        } catch (err) {
            return { error: err } ;
        }
    }
}

module.exports = new IncomeReports();

