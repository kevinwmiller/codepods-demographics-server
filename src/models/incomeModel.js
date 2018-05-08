/**
    @exports IncomeModel
    @file Manages income data obtained from chosen income API
    
    @typedef    {Object} IncomeDetails
    @property   {string} name of the county the income applies to
    @property   {string} most recent income for the given county
*/

const incomeReports = require('../apis/incomeReports') ;


/**
    Requests income data for a given county from data.gov
    
    @param  {string} countyName     Name of the county the annual income applies to
    @return {IncomeDetails[]}       List of objects containing county location and recent annual income 
 */
exports.get = (countyName) => {
    console.log(countyName) ; 
    if (!countyName) {
        throw new Error(`Invalid parameters. No county specified`);
    }
    return incomeReports.getIncome(countyName) ;
}