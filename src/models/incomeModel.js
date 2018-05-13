/**
    @exports IncomeModel
    @file Manages income data obtained from chosen income API
    
    @typedef    {Object} IncomeDetails
    @property   {string} name of the county the income applies to
    @property   {string} most recent income for the given county
*/

const incomeReports = require('../apis/incomeReports') ;

const countyDataGeometry = require('../modeldata/Maryland_Counties_CensusGov.geojson')


function getIncomeByCounty(countyName) => {
   incomeReports.fetchIncomeData(countyName);
}
function getIncomeByMapBounds() => {
    if (!border || !border.topRight || !border.bottomLeft
            || !border.topRight.latitude || !border.bottomLeft.latitude
            || !border.topRight.longitude || !border.bottomLeft.longitude) {
                throw new Error(`Invalid parameter: border '${border}'` );
    }
    const smallestLat = border.bottomLeft.latitude;
    const smallestLng = border.bottomLeft.longitude;
    const largestLat = border.topRight.latitude;
    const largestLng = border.topRight.longitude;

    // Create an array that contains the string  
    // values that are in the original array.  

    const foundCounty1 = countyDataGeometry.filter(
        function (value) {
            return (
                   Number(value.latitude) >= Number(smallestLat)
                && Number(value.latitude) <= Number(largestLat)
                && Number(value.longitude) >= Number(smallestLng)
                && Number(value.longitude) <= Number(largestLng)
            );
        });
    const results = [];
    let foundCounty = foundCounty1;
    for (let i = 0; i < foundCounty.length; ++i) {
        results.push(getIncomeByCounty(foundCounty[i].NAME));
    }
    return results;
}
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
