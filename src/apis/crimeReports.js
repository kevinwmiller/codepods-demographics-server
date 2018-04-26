const axios = require('axios');

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
                        'Weapons Offense'
                        ];
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const URL = 'https://www.crimereports.com/api/crimes/details.json';

/**
 * API wrapper for crimereports.com
 *
 * @class        CrimeReports (name)
 */
class CrimeReports {

    convertToReadable(incidents) {

    }

    /**
    * Requests crime data for a given border area from CrimeReports.com
    *
    * @param    {Object}    startDate    Starting date for reported incidents
    * @param    {Object}    endDate    Ending date for reported incidents
    * @param    {Border}    border    Border box for the desired incident area
    * @return   {IncidentDetails[]} A list of objects containing the location and details of an incident
    */
    async getIncidents(startDate, endDate, border) {
        try {
            let incidents = [];
            const response = await axios.get(URL, {
                params: {
                    'start_date': '2018-03-28',
                    'end_date': '2018-04-26',
                    'start_time': 0,
                    'end_time': 23,
                    'incident_types': INCIDENT_TYPES.join(','),
                    'days': DAYS.join(','),
                    'include_sex_offenders': false,
                    'lat1': 39.2904, // border.topRight.latitude,
                    'lng1': -76.6122, // border.topRight.longitude,
                    'lat2': 39.004, // border.bottomLeft.latitude,
                    'lng2': -75.0122, // border.bottomLeft.longitude,
                    'sandbox': false,
                }
            })

            if (!('agencies' in response.data)) {
                return incidents;
            }
            for (let agency of response.data.agencies) {

                let incident = {
                    agency: agency.agency_name,
                    agency_type: agency.agency_type,
                    crimes: []
                };

                for (let crime of agency.crimes) {
                    incident.crimes.push({
                      id: crime.incident_id,
                      caseNumber: crime.case_number,
                      categorization: crime.categorization,
                      city: crime.city,
                      incidentAddress: crime.address_1,
                      incidentDescription: crime.incident_description,
                      location: {
                        latitude: crime.latitude,
                        longitude: crime.longitude,
                      },
                      parentIncidentType: crime.parent_incident_type,
                      primaryType: crime.incident_type_primary,
                      timestamp: crime.incident_datetime,
                  });
                }
                incidents.push(incident);
            }

            return incidents;

        } catch(err) {
            console.log(err);
        }
    }
}


module.exports = new CrimeReports();