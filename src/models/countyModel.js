/**
    @exports County
    @file Manages income data obtained from chosen income API
    
    @typedef    {Object} IncomeDetails
    @property   {string} name of the county the income applies to
    @property   {string} most recent income for the given county
*/

const countyGeometry = require('../modeldata/maryss');

function getCountyByMapBounds(border)  {
    if (!border || !border.topRight || !border.bottomLeft
            || !border.topRight.latitude || !border.bottomLeft.latitude
            || !border.topRight.longitude || !border.bottomLeft.longitude) {
                throw new Error(`Invalid parameter: border '${border}'` );
    }
    const smallestLat = border.bottomLeft.latitude;
    const smallestLng = border.bottomLeft.longitude;
    const largestLat = border.topRight.latitude;
    const largestLng = border.topRight.longitude;
    const foundCounty1 = countyGeometry.filter(
        function (value) {
            if(value.geometry.type==='Polygon'){
                for(let i = 0; i < value.geometry.coordinates[0].length; ++i){
                    let longitude = value.geometry.coordinates[0][i][0];
                    let latitude = value.geometry.coordinates[0][i][1];

                    if (latitude > smallestLat &&
                       latitude < largestLat &&
                       longitude > smallestLng &&
                       longitude < largestLng) {
                        return value;
		    }
                }

	    }
            else if (value.geometry.type==='GeometryCollection')
            {
		for(let i = 0; i < value.geometry.geometries.length;++i) {
                    
	            for(let j = 0; j < value.geometry.geometries[i].length;++j){
                        let longitude = value.geometry.geometries[i].coordinates[0][j][0];
                        let latitude = value.geometry.geometries[i].coordinates[0][j][1];

                        if (latitude > smallestLat
                           && latitude < largestLat
			   && longitude > smallestLng
                           && longitude < largestLng){
				return value;
			}
                    }
		}
            }
            else {
                return null; 
	    }
        });
	
	
    const counties = [];
    let foundCounty = foundCounty1;
    for (let i = 0; i < foundCounty.length; ++i) {
        //results.push(getIncomeByCounty(foundCounty[i].countyName));
	counties.push(foundCounty[i].countyName);
    }
    
    return counties;
}
/**
    Requests income data for a given county from data.gov
    
    @param  {string} countyName     Name of the county the annual income applies to
    @return {IncomeDetails[]}       List of objects containing county location and recent annual income 
 */
exports.get = (border) => {
    if (!border) {
        throw new Error(`Invalid parameters. No border specified`);
    }
    console.log(border);
    console.log("in county");
    const counties = getCountyByMapBounds(border);
    console.log("counties: " + counties);
    return counties;
};

