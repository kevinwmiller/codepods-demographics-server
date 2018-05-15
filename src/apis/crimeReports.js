/**
 *  API wrapper for crimereports.com
 *
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
 *  @property {string} incidentDescription Description of the crime
 *  @property {Coordinate} location Location coordinates of the crime
 *  @property {string} primaryType
 *  @property {string} timestamp Date and time the crime occurred
 *
 *  @typedef  {Object} Categorization
 *  @property {string} category The crime category
 *  @property {string} subCategory The crime sub category
 *  @property {string} incidentType The incident type of the crime
 *
 *  @typedef  {Object} Coordinate
 *  @property {number} latitude The latitude
 *  @property {number} longitude The longitude
 *
 *  @typedef {Object} Border
 *  @property {Coordinate} topRight Top right of the border rectangle representing the desired crime area
 *  @property {Coordinate} bottomLeft Bottom left of the border rectangle representing the desired crime area
 */

const axios = require('axios');
const moment = require('moment');

// Using https://github.com/happyleavesaoc/python-crimereports/blob/master/crimereports/__init__.py as a base
// Converting it to javascript since it is originally in python. License is MIT
const INCIDENT_TYPES = ['Alarm', 'Arson', 'Assault', 'Assault with Deadly Weapon',
    'Breaking & Entering', 'Community Policing', 'Death',
    'Disorder', 'Drugs', 'Emergency', 'Family Offense', 'Fire',
    'Homicide', 'Kidnapping', 'Liquor', 'Missing Person', 'Other',
    'Other Sexual Offense', 'Pedestrian Stop', 'Proactive Policing',
    'Property Crime', 'Property Crime Commercial',
    'Property Crime Residential', 'Quality of Life', 'Robbery',
    'Sexual Assault', 'Sexual Offense', 'Theft', 'Theft from Vehicle',
    'Theft of Vehicle', 'Traffic', 'Vehicle Recovery', 'Vehicle Stop',
    'Weapons Offense',
];
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const URL = 'https://www.crimereports.com/api/crimes/details.json';

/** This is a cap enforced by the crimereports.com api */
const MAX_INCIDENTS_PER_REQUEST = 1000;

/**
 *  @class    CrimeReports (name)
 */
class CrimeReports {
    /**
    * Requests crime data for a given border area from CrimeReports.com. If the request returns more than 1000 entries,
    * the request will be split into multiple requests
    *
    * @param    {string}    startDate    Starting date for reported incidents Format: YYYY-MM-DD
    * @param    {string}    endDate    Ending date for reported incidents Format: YYYY-MM-DD
    * @param    {Border}    border    Border box for the desired incident area
    * @return   {IncidentDetails[]} A list of objects containing the location and details of an incident
    */
    async fetchIncidentData(startDate, endDate, border, incidents = []) {
        const params = {
            params: {
                start_date: startDate.format('YYYY-MM-DD'),
                end_date: endDate.format('YYYY-MM-DD'),
                start_time: 0,
                end_time: 23,
                incident_types: INCIDENT_TYPES.join(','),
                days: DAYS.join(','),
                include_sex_offenders: false,
                lat1: border.topRight.latitude,
                lng1: border.topRight.longitude,
                lat2: border.bottomLeft.latitude,
                lng2: border.bottomLeft.longitude,
                sandbox: false,
            },
        };
        const response = await axios.get(URL, params);
        let aggregatedIncidents = incidents;
        // crimereports.com only returns data with < 1000 items. If our initial request contains more than this cap,
        // we need to split it into multiple requests
        // Also has a limit of 6 months between start and end dates, so we may need to split long date ranges up as well
        if (response.data.instance_count < MAX_INCIDENTS_PER_REQUEST) {
            aggregatedIncidents = incidents.concat(response.data.agencies.map((agency) => {
                const incident = {
                    agency: agency.agency_name,
                    agency_type: agency.agency_type,
                    crimes: [],
                };
                incident.crimes = (agency.crimes.map((crime) => {
                    const crimeData = {
                        id: crime.incident_id,
                        caseNumber: crime.case_number,
                        categorization: {
                            category: crime.categorization.category,
                            subCategory: crime.categorization.sub_category,
                            incidentType: crime.categorization.incident_type,
                        },
                        city: crime.city,
                        incidentAddress: crime.address_1,
                        incidentDescription: crime.incident_description,
                        location: {
                            latitude: crime.latitude,
                            longitude: crime.longitude,
                        },
                        primaryType: crime.incident_type_primary,
                        timestamp: crime.incident_datetime,
                    };
                    return crimeData;
                }));
                return incident;
            }));
        } else {
            // Make a request for the lower and upper halves of the requested date range
            const totalDaysRequested = moment.duration(startDate.diff(endDate)).asDays();
            const lowerHalfEndDate = moment(endDate.clone().add((totalDaysRequested / 2), 'day'), 'YYYY-MM-DD');
            const upperHalfStartDate = moment(endDate.clone().add((totalDaysRequested / 2) + 1, 'day'), 'YYYY-MM-DD');
            aggregatedIncidents = incidents.concat(await this.fetchIncidentData(startDate, lowerHalfEndDate, border, aggregatedIncidents));
            aggregatedIncidents = incidents.concat(await this.fetchIncidentData(upperHalfStartDate, endDate, border, aggregatedIncidents));
        }
        return aggregatedIncidents;
    }

    /**
    * Requests crime data for a given border area from CrimeReports.com
    *
    * @param    {string}    startDate    Starting date for reported incidents Format: YYYY-MM-DD
    * @param    {string}    endDate    Ending date for reported incidents Format: YYYY-MM-DD
    * @param    {Border}    border    Border box for the desired incident area
    * @return   {IncidentDetails[]} A list of objects containing the location and details of an incident
    */
    async getIncidents(startDate, endDate, border) {
        try {
            return await this.fetchIncidentData(moment(startDate, 'YYYY-MM-DD'), moment(endDate, 'YYYY-MM-DD'), border);
        } catch (err) {
            return { error: err };
        }
    }
}

module.exports = new CrimeReports();
