/**
    @exports CrimeModel
    @file Manages crime data obtained from CrimeReports.com

 *  @typedef  {Object} IncidentDetails
 *  @property {string} agency The name of the agency processing the incidents
 *  @property {string} agency_type The type of processing agency
 *  @property {CrimeDetail[]} crimes The type of processing agency
 *
 *  @typedef  {Object} CrimeDetails
 *  @property {string} id Unique identifier of the crime
 *  @property {string} caseNumber The case number associated with the crime
 *  @property {Categorization} categorization Categorical information about the crime
 *  @property {string} city City containing the crime
 *  @property {string} incidentAddress The address the crime occurred at
 *  @property {string} incidentDescription Decription of the crim
 *  @property {Coordinate} location Location coordinates of the crime
 *  @property {string} primaryType
 *  @property {string} timestamp Date and time the crime occurred

    @typedef {Object} Coordinate
    @property {number} latitude The latitude
    @property {number} longitude The longitude

    @typedef {Object} Border
    @property {Coordinate} topRight Top right of the border rectangle representing the desired crime area
    @property {Coordinate} bottomLeft Bottom left of the border rectangle representing the desired crime area
 */

const crimeReports = require('../apis/crimeReports');

/**
 * Requests crime data for a given border area from CrimeReports.com
 *
 * @param      {string}  startDate  Starting date for reported incidents Format: YYYY-MM-DD
 * @param      {string}  endDate  Ending date for reported incidents Format: YYYY-MM-DD
 * @param      {Border}  border  Border box for the desired incident area
 * @return     {IncidentDetails[]} A list of objects containing the location and details of an incident
 */
exports.get = (startDate, endDate, border) => {
    console.log(startDate);
    console.log(endDate);
    console.log(border);
    if (!startDate || !endDate || !border || !border.topRight || !border.bottomLeft) {
        console.log(border.topRight)
        throw new Error(`Invalid parameters startDate: '${startDate}' endDate: '${endDate}' border: '${border}'`);
    }
    return crimeReports.getIncidents(startDate, endDate, border);
};
