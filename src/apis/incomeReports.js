/**
    API wrapper for chosen data.gov income source

    @exports IncomeModel
    @file Manages income data obtained from chosen income API
    
    @typedef    {Object} IncomeDetails
    @property   {string} name of the county the income applies to
    @property   {string} most recent income for the given county
*/

const axios = require('axios') ;

const URL = 'https://data.maryland.gov/api/views/nv7y-8663';

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
    async fetchIncomeData(countyName) {
        const response = await axios.get(URL);
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
    async getIncome(countyName) {
        try {
            return await this.fetchIncomeData(countyName);
        } catch (err) {
            return { error: err } ;
        }
    }
}

module.exports = new IncomeReports();

