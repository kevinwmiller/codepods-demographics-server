/**
    @exports CrimeModel
    @file Manages crime data obtained from CrimeReports.com
    
    @typedef {Object} IncidentDetails
    @property {string} IncidentType The name of the occurred incident
    @property {string} Last The person's last name

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
 * @param      {Object}  startDate  Starting date for reported incidents
 * @param      {Object}  endDate  Ending date for reported incidents
 * @param      {Border}  border  Border box for the desired incident area
 * @return     {IncidentDetails[]} A list of objects containing the location and details of an incident
 */
exports.get = (startDate, endDate, border) => {
    return crimeReports.getIncidents(startDate, endDate, border);
};